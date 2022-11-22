// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

library TransferHelper {

    event  Transfer(address indexed src, uint wad);

    function safeTransferETH(address to, uint value) internal {
        (bool success,) = to.call{value:value}(new bytes(0));
        require(success, 'TransferHelper: ETH_TRANSFER_FAILED');

        emit Transfer(to, value);
    }

}
