import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";       // js风格：require('@nomiclabs/hardhat-ethers');
import "@openzeppelin/hardhat-upgrades"; // js风格： require('@openzeppelin/hardhat-upgrades');

const config: HardhatUserConfig = {
  solidity: "0.8.17",
};

export default config;
