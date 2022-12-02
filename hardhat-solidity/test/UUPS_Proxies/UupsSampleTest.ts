
// npx hardhat test test/UUPS_Proxies/UupsSampleTest.ts


import { ethers, upgrades } from 'hardhat';

describe('MyToken', function () {
    it('deploys', async function () {
        const MyTokenV1 = await ethers.getContractFactory('MyTokenV1');
        // await MyTokenV1.deploy();    // 不可升级的方式
        // await upgrades.deployProxy(MyTokenV1); // instead of MyTokenV1.deploy()，可以升级，但是 是 Transparent Proxies 模式
                                                // 它会检查 unsafe patterns 要求的可能有问题的操作，例如不能有 selfdestruct 函数
        const proxyAddress= await upgrades.deployProxy(MyTokenV1, { kind: 'uups' }); // 必须加上 uups参数，另外合约要继承 UUPSUpgradeable.sol

        const MyTokenV2 = await ethers.getContractFactory('MyTokenV2');

        await upgrades.upgradeProxy(proxyAddress, MyTokenV2);

        console.log("proxy address:", proxyAddress.address)

    });
});








