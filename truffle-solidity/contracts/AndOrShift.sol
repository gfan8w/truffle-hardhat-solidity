// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


// truffle-flattener ./contracts/AndOrShift.sol > ./build/flatten/AndOrShift.sol
import './lib/Strings.sol';


contract AndOrShift {

    function integerToString(uint value) public pure
    returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function and() public pure returns(uint) {
        uint a = 2; // 局部变量
        uint b = 3;
        uint result = a & b;  // 位与
        //return integerToString(result);
        return result;
    }

    //bytes1 =uint8， uint8再转换为uint256
    // uint length = uint(uint8(3));
    function and2() public pure returns(string memory) {
        bytes1 a = 0xb5; //  [10110101]
        bytes1 b = 0x56; //  [01010110]
        uint8 result = uint8(a & b);  // 位与
        return Strings.toHexString(uint(result), 20);
    }

    function shift() public pure returns(uint256) {
        uint256 a = 1;
        uint256 b = 18;
        uint256 result = a<<b;
        return result;
    }

    function multi() public pure returns(uint256) {
        uint256 a = 1;
        uint256 b = 18;
        for(uint256 i=1;i<=18;i++){
            a=a*10;
        }
        return a;
    }


}








