import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";       // js风格：require('@nomiclabs/hardhat-ethers');
import "@openzeppelin/hardhat-upgrades"; // js风格： require('@openzeppelin/hardhat-upgrades');
import { resolve } from 'path';

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
    },
    rinkbey: {
      url: 'https://rinkeby.infura.io/v3/c1092815dc56459f9bf6faa712857e55',
      chainId: 4,
      gasPrice: 20000000000,
      accounts: ['cc61950f69e29c9e85b76ca844c728ed0f6394d27b2543434e4917c12273781d'],
    },
    goerli: {
      url: 'https://goerli.infura.io/v3/c1092815dc56459f9bf6faa712857e55',
      chainId: 5,
      gasPrice: 10_000_000_000,
      accounts: ['ce61950f69e29c9e85b76ca844c728d20f6394d27b2543434e4917c12273791d'],
    },
    bsc: {
      url: 'https://speedy-nodes-nyc.moralis.io/<>/bsc/mainnet',
      chainId: 56,
      gasPrice: 10_000_000_000,
      accounts: ['cc61950f69e29c9e95b76ca844c728ed0f6394d27b2543434e4917c12273781d'],
    },
  },
};

export default config;
