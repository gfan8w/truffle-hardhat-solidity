// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "../lib/BytesLib.sol";

contract LooCallAndDelegateCall {
  using BytesLib for bytes;

  FooCallAndDelegate foo;
  event Result(bool,uint256);
  function callWithInstance(address payable _t, uint a, uint b) public returns(uint) {
    foo = FooCallAndDelegate(_t);
    uint c= foo.bar(a,b);
    emit Result(true, c);
    return c;
  }

  function callWithEncodeSignature(address _t, uint a, uint b) public returns(uint) {
    bytes memory data = abi.encodeWithSignature("bar(uint256,uint256)", a, b);
    (bool success, bytes memory returnData) = _t.call(data);
    require(success,_getRevertMsg(returnData));
    uint c = abi.decode(returnData, (uint256));
    emit Result(success, c);
    return c;
  }

//  function callWithEncode(address _t, uint a, uint b) public returns(uint) {
//    (bool success, bytes memory returnData) = _t.call( bytes4(keccak256("bar(uint, uint)")), a, b);
//    require(success);
//    uint c = abi.decode(returnData, (uint));
//    return c;
//  }

  /// @dev Get the revert message from a call https://ethereum.stackexchange.com/questions/83528/how-can-i-get-the-revert-reason-of-a-call-in-solidity-so-that-i-can-use-it-in-th
  /// @notice This is needed in order to get the human-readable revert message from a call
  /// @param _res Response of the call
  /// @return Revert message string
  function _getRevertMsg(bytes memory _res) internal pure returns (string memory) {
    // If the _res length is less than 68, then the transaction failed silently (without a revert message)
    if (_res.length < 68) return 'Transaction reverted silently';
    bytes memory revertData = _res.slice(4, _res.length - 4); // Remove the selector which is the first 4 bytes
    return abi.decode(revertData, (string)); // All that remains is the revert string
  }

}

contract FooCallAndDelegate {
  function bar(uint a, uint b) public pure returns(uint) {
    require(1==2,"man made revert!");//制造一个revert，在调用方 那里解析出这段信息
    return a+b;
  }
}
