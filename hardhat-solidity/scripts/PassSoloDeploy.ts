import {ethers, upgrades} from 'hardhat';
import { deployContract, deployUpgradeableContract } from './util';

// npx hardhat run scripts/GachaTierPassSoloDeploy.ts --network goerli


const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));


async function main() {
  try {
    const [deployer, acc1] = await ethers.getSigners();
    const feeReceiver = deployer;

    console.log(`Deploying contracts with account: ${deployer.address}`);
    console.log(`feeReceiver: ${feeReceiver.address}`);

    const balance = await deployer.getBalance();
    console.log(`Account balance: ${balance.toString()}`);


    let nonce = await deployer.getTransactionCount('latest');
    console.log("nonce:",nonce);
    const contractFactory = await ethers.getContractFactory("PassSolo");
    const minPriceEthers = 0.000002;
    const value = ethers.utils.parseEther(minPriceEthers.toString());

    const PassSolo_baseContract = await contractFactory.deploy([]);
    console.log("PassSolo_baseContract.address:",PassSolo_baseContract.address);
    // PassSolo_baseContract.connect(acc1).#####     // 使用另外一个账号


    const BoxRegistry = await ethers.getContractFactory('BoxRegistry');
    console.log('Deploying BoxRegistry...');
    const boxRegistry = await upgrades.deployProxy(BoxRegistry,
        [PassSolo_baseContract.address],
        { initializer: 'initialize', kind: 'uups', timeout:0, pollingInterval: 10000 });
    await boxRegistry.deployed();
    console.log('boxRegistry deployed to:', boxRegistry.address);

    boxRegistry.on("ContractDeployed", (id, address) => {
      console.log("ContractDeployed event:")
      console.log( id.toString(), address.toHexString());
    });

    const deploytx = await ethers.provider.getTransaction(boxRegistry.deployTransaction.hash);
    console.log("deployContract boxRegistry at block number: ",  await deploytx.wait()); // wait() 能拿到其他信息

    let receipt = await boxRegistry.createBox(1,"hello", value,{gasPrice:14_000_000_000,gasLimit:500000});

    const tsevents = await boxRegistry.queryFilter(boxRegistry.filters.ContractDeployed(), receipt.blockHash);

    for (const event of tsevents.filter(e => e.transactionHash == receipt.transactionHash)) {
      const { id, add } = event.args!;
      console.log(id?.toString(), add?.toHexString());
    }

    let add = await boxRegistry.contracts(1);
    console.log("address in register:", add);

    await sleep(3000);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
