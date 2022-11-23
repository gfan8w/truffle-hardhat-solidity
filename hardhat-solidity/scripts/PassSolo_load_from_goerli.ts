import {ethers, upgrades} from 'hardhat';
import { deployContract, deployUpgradeableContract } from './util';
// npx hardhat run scripts/GachaTierPassSoloDeploy.ts --network goerli


const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));


async function main() {
  try {
    const [deployer] = await ethers.getSigners();
    const feeReceiver = deployer;

    console.log(`Deploying contracts with account: ${deployer.address}`);
    console.log(`feeReceiver: ${feeReceiver.address}`);

    const balance = await deployer.getBalance();
    console.log(`Account balance: ${balance.toString()}`);


    let boxRegistry = await ethers.getContractAt("BoxRegistry","0xb413124c720fD7A2195136C603FEE5c8C1562cE2")
    //2. using attach
    //let BoxRegistry = await ethers.getContractFactory("BoxRegistry");
    //this.COC = BoxRegistry.attach("0xb413124c720fD7A2195136C603FEE5c8C1562cE2")


    // boxRegistry.on("ContractDeployed", (id, address) => {
    //   console.log("ContractDeployed event:")
    //   console.log( id.toString(), address.toHexString());
    // });
    //
    // let receipt = await boxRegistry.createBox(1,"hello", value);
    //
    // const tsevents = await boxRegistry.queryFilter(boxRegistry.filters.ContractDeployed(), receipt.blockHash);
    //
    // for (const event of tsevents.filter(e => e.transactionHash == receipt.transactionHash)) {
    //   const { id, add } = event.args!;
    //   console.log(id?.toString(), add?.toHexString());
    // }

    let add = await boxRegistry.contracts(1);
    console.log("address in register:", add);


    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
