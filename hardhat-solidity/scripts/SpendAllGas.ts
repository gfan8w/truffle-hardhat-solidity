import { ethers } from "hardhat";

// npx hardhat run scripts/SpendAllGas.ts
async function main() {
  const SpendAllGasFac = await ethers.getContractFactory("SpendAllGas");
  const SpendAllGas = await SpendAllGasFac.deploy();

  await SpendAllGas.deployed();

  console.log(`deployed to ${SpendAllGas.address}`);

  await SpendAllGas.forever()

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
