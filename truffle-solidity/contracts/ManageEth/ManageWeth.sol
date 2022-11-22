// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import './TransferHelper.sol';
import './IWETH.sol';


contract ManageWeth {

  address public _wethadd ;

  constructor(address wethadd){
    _wethadd=wethadd;
  }

  // 该 receive 用来处理widthdraw函数取回的eth，
  receive() external payable {
    assert(msg.sender == _wethadd); // only accept ETH via fallback from the WETH contract
  }

  function deposit(address handler, uint value) public payable {
    IWETH(_wethadd).deposit{value: value}();
  }

  // 操作 weth，IWETH的withdraw把eth取回到ManageWeth本合约，然后从本合约safeTransfer到目标地址
  function widthdraw(address receipt, uint amount) public {
    IWETH(_wethadd).withdraw(amount);
    //payable(address(recipientAddress)).transfer(amount);
    TransferHelper.safeTransferETH(address(receipt), amount);
  }

  function getBalance(address add) public view returns (uint256) {
      return add.balance;
  }


}
