
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
*/

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MyTokenV2 is Initializable, ERC20Upgradeable, UUPSUpgradeable, OwnableUpgradeable {
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


    uint256 private _value;

    // Emitted when the stored value changes
    event ValueChanged(uint256 value);

    // Stores a new value in the contract
    function store(uint256 value) public {
        _value = value;
        emit ValueChanged(value);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return _value;
    }
}
