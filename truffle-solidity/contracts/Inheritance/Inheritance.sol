
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

/* Graph of inheritance
    A
   / \
  B   C
 / \ /
F  D,E

*/

contract A {
    function foo() public pure virtual returns (string memory) {
        return "A";
    }
}

//继承使用的是 is 关键字
contract B is A {
    // 覆盖 A.foo() 方法
    function foo() public pure override virtual returns (string memory) {
        return "B";
    }
}

contract C is A {
    // 覆盖 A.foo() 方法
    function foo() public pure override virtual returns (string memory) {
        return "C";
    }
}

//当有复写了基类的2个同名方法，查找顺序是从右到左，深度优先查找
contract D is B,C {
    // D.foo() returns "C"
    // 因为 C是最右边的父类
    function foo() public pure override(B,C) virtual returns(string memory) {
        return super.foo();
    }
}

contract E is C, B {
    // E.foo() returns "B"
    // since B is the right most parent contract with function foo()
    function foo() public pure override(C, B) returns (string memory) {
        return super.foo();
    }
}

// Inheritance must be ordered from “most base-like” to “most derived”.
// Swapping the order of A and B will throw a compilation error.
// 继承规则必须是先写偏基类的、继承深入浅的，后写继承深入更深的，他们之间要形成一个线性关系图
contract F is A, B {
    function foo() public pure override(A, B) returns (string memory) {
        return super.foo(); //输出B
    }
}





















