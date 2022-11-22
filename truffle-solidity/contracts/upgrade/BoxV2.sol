// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BoxV2 {
    uint256 private value;
    uint256 private age;
    // Emitted when the stored value changes
    event ValueChanged(uint256 newValue);
    event AgeChanged(uint256 newAge);
    // Stores a new value in the contract
    function store(uint256 newValue, uint256 newAge) public {
        value = newValue;
        age=newAge;
        emit ValueChanged(newValue);
        emit AgeChanged(newAge);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return value;
    }
    // Increments the stored value by 1
    function increment() public {
        value = value + 1;
        emit ValueChanged(value);
    }

    // Reads the last stored age
    function retrieveAge() public view returns (uint256) {
        return age;
    }
    // Increments the stored age by 1
    function incrementAge() public {
        age = age + 1;
        emit AgeChanged(age);
    }
}






















