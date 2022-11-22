// SPDX-License-Identifier: MIT

//演示 call 和 delegatecall 区别
// https://medium.com/coinmonks/delegatecall-calling-another-contract-function-in-solidity-b579f804178c
pragma solidity >=0.4.22 <0.9.0;
contract Calculator {
    // Position of calculateResult is important!
    // 每个变量一个槽位，一个变量32位
    uint256 public calculateResult;

    address public user;

    event Add(uint256 a, uint256 b);

    function add(uint256 a, uint256 b) public returns (uint256) {
        calculateResult = a + b;
        assert(calculateResult >= a);

        emit Add(a, b);
        user = msg.sender;

        return calculateResult;
    }
}


