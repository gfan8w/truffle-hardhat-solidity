
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 参考： https://github.com/thegostep/solidity-create2-deployer

contract Create2Deployer {
//    constructor(address beneficiary) {
//        selfdestruct(payable(beneficiary)); // don't deploy code. Return the ether stored here to the beneficiary.
//    }

    event Deployed(address addr, uint ssize, uint salt);

    function deployContract(bytes memory bytecode, uint _salt) public payable {
        address addr;
        uint ssize;
        /*
        NOTE: How to call create2

        create2(v, p, n, s)
        create new contract with code at memory p to p + n
        and send v wei
        and return the new address
        where new address = first 20 bytes of keccak256(0xff + address(this) + s + keccak256(mem[p…(p+n)))
              s = big-endian 256-bit value
        */
        assembly {
            addr := create2(
            callvalue(), // wei sent with current call
            // Actual code starts after skipping the first 32 bytes
            add(bytecode, 0x20),
            mload(bytecode), // Load the size of code contained in the first 32 bytes
            _salt // Salt from function arguments
            )
            ssize := extcodesize(addr)
            if iszero(ssize) {
                revert(0, 0)
            }
        }

        emit Deployed(addr, ssize, _salt);
    }
}
