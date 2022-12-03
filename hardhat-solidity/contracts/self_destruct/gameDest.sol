// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GameDest {
    constructor(address beneficiary) {
        selfdestruct(payable(beneficiary)); // don't deploy code. Return the ether stored here to the beneficiary.
    }
}
