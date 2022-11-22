// contracts/Box.sol，
// 演示升级合约，使用 @openzeppelin/hardhat-upgrades
// 1. yarn add --dev @openzeppelin/hardhat-upgrades
// 2.在 hardhat.config.ts中添加依赖:
// import "@nomiclabs/hardhat-ethers";
// import "@openzeppelin/hardhat-upgrades"; // js风格： require('@openzeppelin/hardhat-upgrades');


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Box {
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
