import { ethers, upgrades} from "hardhat";

// npx hardhat run --network localhost scripts/deploy_upgradeable_box.js
// npx hardhat run scripts/deploy_upgradeable_box.js

async function main() {
    const Box = await ethers.getContractFactory('Box');
    console.log('Deploying Box...');
    const box = await upgrades.deployProxy(Box, [42], { initializer: 'store' });
    await box.deployed();
    console.log('Box deployed to:', box.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
