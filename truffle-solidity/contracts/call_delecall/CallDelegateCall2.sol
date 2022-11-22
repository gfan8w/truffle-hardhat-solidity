// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

// https://me.tryblockchain.org/Solidity-call-callcode-delegatecall.html
// https://gist.github.com/Muhammad-Altabba/55ac6974ac9396d723fdfd792d51eb5d

contract CallAndDelegatePerson{

  bytes fail;

  fallback() external payable {
    fail = msg.data;
  }

  function getFail() public view returns (bytes memory){
    return fail;
  }

}


contract CallAndDelegateCallTest{
  event Result(bool,bytes);

 // 由于向另一个合约发送数据时，找不到对应的方法签名，会默认调用fallback()函数2，所以我们可以通过这个来看看call()传的具体数据
  function callData(address payable addr) public returns (bool){
    (bool success, bytes memory returnData) = addr.call(abi.encodeWithSignature("abc", 256));
    emit Result(success, returnData);
    return true;
  }

}
