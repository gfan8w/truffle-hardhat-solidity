const Box = artifacts.require('Box');
const BoxV2 = artifacts.require('BoxV2');
const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');
module.exports = async function (deployer) {
    const box = await Box.deployed();
    console.log("box address:",box.address);
    await upgradeProxy(box.address, BoxV2, { deployer });  [42], { deployer, initializer: 'store' }
    console.log("Upgraded", box.address);
};

// 运行： truffle migrate

/*

3_deploy_box.js
===============

   Deploying 'TransparentUpgradeableProxy'
   ---------------------------------------
   > transaction hash:    0x4b459e7a30ac0d3d568ff8c68716aa1d13e40af351db41cacfea4e3769adea0d
   > Blocks: 0            Seconds: 0
   > contract address:    0xb063D42D588B638d332339A03941a1083B5bd82F    (这个地址是代理proxy的地址)
   > block number:        3902
   > block timestamp:     1647431323
   > account:             0xff93B45308FD417dF303D6515aB04D9e89a750Ca
   > balance:             2000
   > gas used:            807970 (0xc5422)
   > gas price:           1 gwei
   > value sent:          0 ETH
   > total cost:          0.00080797 ETH

4_upgrade_boxv2.js
==================
box address: 0xb063D42D588B638d332339A03941a1083B5bd82F     （部署升级后的地址还是这个proxy地址）
Upgraded 0xb063D42D588B638d332339A03941a1083B5bd82F

   > Saving migration to chain.
   -------------------------------------
   > Total cost:                   0 ETH



参考：https://chunyu-hsiao93.medium.com/openzeppelin-upgradable%E5%8F%AF%E5%8D%87%E7%B4%9A%E5%90%88%E7%B4%84%E5%AF%A6%E6%B8%AC-truffle%E7%89%88-866feb0e7efc

*
* */
