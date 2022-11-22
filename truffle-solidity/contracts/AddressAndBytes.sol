// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;
contract AddressAndBytes {

    //把地址打印出来
    /*

    '0': '0x000000000000000000000000ff93b45308fd417df303d6515ab04d9e89a750ca',
    '1': '0xff93b45308fd417df303d6515ab04d9e89a750ca000000000000000000000000'

    uint256转换为bytes的方法是 abi.encodePacked

    */
    function getAddress() public view returns (bytes memory,bytes memory) {
        address a =msg.sender;
        uint conv = uint(uint160(a)) << 0x60;
        return (abi.encodePacked(uint256(uint160(a))), abi.encodePacked(conv));
    }

}


