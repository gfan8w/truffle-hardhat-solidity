// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

/* Inheritance tree
   A
 /  \
B   C
 \ /
  D
*/

contract CPA {
    // This is called an event. You can emit events from your function
    // and they are logged into the transaction log.
    // In our case, this will be useful for tracing function calls.
    event Log(string message);

    function concatenate(string memory a, string memory b) internal pure returns (string memory) {
        return string(abi.encodePacked(a, " ", b));
    }

    function foo() public  virtual returns (string memory) {
        emit Log("A.foo called");
        return "A.foo";
    }

    function bar() public virtual  returns (string memory) {
        emit Log("A.bar called");
        return "A.bar";
    }
}

contract CPB is CPA {
    function foo() public virtual override  returns (string memory) {
        emit Log("B.foo called");
        return concatenate("B.foo", CPA.foo());
    }

    function bar() public virtual override returns (string memory) {
        emit Log("B.bar called");
        return concatenate("B.bar ",super.bar());
    }
}

contract CPC is CPA {
    function foo() public virtual override returns (string memory) {
        emit Log("C.foo called");
        return concatenate("C.foo", CPA.foo());
        //return "C.foo "+CPA.foo();
    }

    function bar() public virtual override returns (string memory) {
        emit Log("C.bar called");
        return concatenate("C.bar", super.bar());
        //return "C.bar "+super.bar();
    }
}

contract CPD is CPB, CPC {
    // Try:
    // - Call D.foo and check the transaction logs.
    //   Although D inherits A, B and C, it only called C and then A.
    // - Call D.bar and check the transaction logs
    //   D called C, then B, and finally A.
    //   Although super was called twice (by B and C) it only called A once.

    function foo() public override(CPB, CPC) returns (string memory) {
        string memory v = concatenate("D.foo", super.foo());
        emit Log(v);
        return v;
        //return "D.foo "+super.foo();
    }

    function bar() public override(CPB, CPC) returns (string memory) {
        string memory v = concatenate("D.bar", super.bar());
        emit Log(v);
        return v;
        //return "D.bar "+super.bar(); //所有直接的父类 都被调用
    }
}
