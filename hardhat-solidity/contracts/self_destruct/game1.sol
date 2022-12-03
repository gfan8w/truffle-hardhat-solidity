
import "hardhat/console.sol";

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//测试题： 如何从该合约中取出 ether
// 设置一个 selfdestruct(msg.sender) 合约，只需要2个字节。 check + execute 就可以
contract game1 {
    event win(address addr);

    address public code;
    address public owner;

    constructor() public payable {
        owner = msg.sender;
    }

    function check(address addr) public {
        uint size;
        assembly { size := extcodesize(addr)}
        console.log(
            "code size %s",
                size
        );
        require(size>0 && size<=4);
        code = addr;
    }

    function execute() public {
        require(code!= address(0));
        code.delegatecall(abi.encodeWithSelector(bytes4(keccak256(""))));
        selfdestruct(payable(address(uint160(owner)))); // 自毁的时候会将合约里的钱发送到 owner这个地址

    }

    function getBouns() public payable {
        require(msg.value >= 23333 ether);
        emit win(msg.sender);
        payable(msg.sender).transfer(address(this).balance);
    }

    fallback () external payable {}



}
