import { ethers, upgrades} from "hardhat";

// 先运行 Box.sol，部署v1版本
// npx hardhat run --network localhost scripts/deploy_upgradeable_box.js
// npx hardhat run scripts/deploy_upgradeable_box.js

// 或者 直接运行本例子，它把原V1合约与新V2合约合并在一起演示
// npx hardhat run scripts/upgrade_box.ts

async function main() {
    const Box = await ethers.getContractFactory('Box');
    console.log('Deploying Box...');
    const box = await upgrades.deployProxy(Box, [42], { initializer: 'store' });
    await box.deployed();
    console.log('Box deployed to:', box.address);
    let val = await box.retrieve();
    console.log("val in Box v1:", val.toString())

    const boxV2 = await ethers.getContractFactory('BoxV2');
    console.log('Upgrading Box...');
    // await upgrades.upgradeProxy('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', BoxV2);  // 直接填V1合约的地址。
    let contract = await upgrades.upgradeProxy(box.address, boxV2);
    console.log('Box upgraded');

    // 升级后合约地址不变
    await contract.increment();
    let val2 = await box.retrieve();
    console.log("val in Box v2:", val2.toString())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
