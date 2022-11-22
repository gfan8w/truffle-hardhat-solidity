// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

// https://me.tryblockchain.org/Solidity-call-callcode-delegatecall.html
// https://gist.github.com/Muhammad-Altabba/55ac6974ac9396d723fdfd792d51eb5d

contract EncodeDecode {
  function encode(string memory _string1, uint _uint, string memory _string2) public pure returns (bytes memory) {
    return (abi.encode(_string1, _uint, _string2));
  }
  function decode(bytes memory data) public pure returns (string memory _str1, uint _number, string memory _str2) {
    (_str1, _number, _str2) = abi.decode(data, (string, uint, string));
  }

  function encodeTransfer() public pure returns (bytes memory){
       bytes memory trans = abi.encodeWithSignature("transferFrom(address,address,uint256)", address(0x4CEEf6139f00F9F4535Ad19640Ff7A0137708485), address(0x9ea356d25c658A648f408ABE2322F2f01F12A0F0), 3);
       return trans;
  }

  function decodeTransfer(bytes memory data) public pure returns (bytes4 _fn, address _from, address _to, uint256 _tokenId) {
     (bytes4 _f, uint256 _fr, uint256 _t, uint256 _tkn) = abi.decode(data, (bytes4,uint256,uint256,uint256));
    _fn =_f ;
    _from = address(uint160(_fr));
     _to =address(uint160(_t));
    _tokenId=_tkn;
  }

}
