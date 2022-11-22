// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;


contract GardenTestContract {

    function getBalanceOf(address _address) public view returns (bool, uint, uint, address) {
        address sender = msg.sender;
        // abi.encodeWithSignature("balanceOf(address)", sender)
        bytes memory calld =abi.encodeWithSelector(bytes4(keccak256(bytes("balanceOf(address)"))), sender);
        (bool _success, bytes memory data) = _address.staticcall(calld);
        (uint amount) = abi.decode(data, (uint256));
        return (_success, data.length, amount, sender);
    }

    function getTotalSupply(address _address) public view returns (uint) {
        (bool _success2, bytes memory data) = _address.staticcall(abi.encodeWithSignature("totalSupply()"));
        (uint amount) = abi.decode(data, (uint256));
        return amount;
    }

}


contract GardenTestToken {
    function totalSupply() public  returns (uint256) {
        return 30000;
    }

    /**
     * @dev See {IERC20-balanceOf}.
     */
    address a;
    function balanceOf(address account) public  returns (uint256) {
        // staticcall 只能调用 views, pure 类的函数
         //a=account;
        return 20;
    }
}

