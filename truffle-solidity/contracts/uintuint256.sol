// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;
contract uintuint256 {

    // uint 与 uint256的区别，他们是同一个东西，但推荐用uint256，transfer(address, uint) 与 transfer(address, uint256) 是同一个东西，
    // 但 根据4字节的sig来辨识的时候，evm只认 transfer(address, uint256)
    function getSig() public pure returns(bytes4, bytes4) {
       bytes4 a= bytes4(keccak256('transfer(address, uint)'));
        bytes4 b= bytes4(keccak256('transfer(address, uint256)'));
        return (a,b);
    }

    //下面2个方法，只能定义一个

    function transfer(address add, uint value) public {}

    //function transfer(address add, uint256 value) public {}
}


