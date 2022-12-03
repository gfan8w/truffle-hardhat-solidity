
// 演示uups模式的升级合约，Universal Upgradeable Proxy Standard (UUPS)
// npm init -y
// npm install hardhat @nomiclabs/hardhat-ethers ethers
// npm install @openzeppelin/contracts-upgradeable @openzeppelin/hardhat-upgrades


// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/*
可升级合约不是通过构造函数初始化的，是通过额外的 initialize() 函数来初始化。 引入额外的 Initializable
本身是ERC20,引入 ERC20Upgradeable，
UUPS模式，引入 UUPSUpgradeable，UUPS的升级逻辑是放在逻辑合约里的不在proxy合约里。
只有owner 可以升级，引入 OwnableUpgradeable

EIP-1967： 固定某个槽位存放逻辑合约地址
地址的计算：
Storage slot 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc
： bytes32(uint256(keccak256('eip1967.proxy.implementation')) - 1)

Beacon contract address 信标合约地址的计算：
Storage slot 0xa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50 ：
 bytes32(uint256(keccak256('eip1967.proxy.beacon')) - 1)

上面2个地址，二选一，不要同时占用。

信标合约的作用是多个代理合约的逻辑合约地址保存在一个地方，升级代理合约的时候，只需要更新一个地址即可。
信标合约有一个函数： function implementation() returns (address)  返回逻辑合约的地址。
从信标合约获取逻辑合约有2个步骤：
1） 从信标合约槽位获取信标合约地址
2）调用该地址上的implementation()函数获取逻辑合约地址

管理员地址：Admin address
Storage slot 0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103
计算方式：bytes32(uint256(keccak256('eip1967.proxy.admin')) - 1))

https://forum.openzeppelin.com/t/uups-proxies-tutorial-solidity-javascript/7786
*/



import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MyTokenV1 is Initializable, ERC20Upgradeable, UUPSUpgradeable, OwnableUpgradeable {
    function initialize() initializer public {
        __ERC20_init("MyToken", "MTK");
        __Ownable_init();
        __UUPSUpgradeable_init();
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    /// 实现 _authorizeUpgrade 来验证只有owner可以升级
    function _authorizeUpgrade(address) internal override onlyOwner {}
}
