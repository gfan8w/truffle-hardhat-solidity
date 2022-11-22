// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//storage - 变量数据是存储在链上。
//memory - 变量是在内存里的，函数被调用时存在
//calldata - 用于external的函数上。

contract DataLocations {

    uint[] public arr;
    mapping(uint => address) map;
    struct MyStruct {
        uint foo;
    }
    mapping(uint => MyStruct) myStructs;

    function f() public {
        // call _f with state variables
        _f(arr, map, myStructs[1]);

        _f2(arr, myStructs[1]);

        // get a struct from a mapping
        // Declaring this variable as `storage` means it'll actually a pointer
        // to  myStructs[_index]
        MyStruct storage myStoreStruct = myStructs[1];

        // so updating it will cause that it will change
        // myStoreStruct.foo on the blockchain.
        myStoreStruct.foo++;

        // Using `memory` the variable will be a copy of the data
        MyStruct memory myMemStruct = myStructs[1];

        // updating it will not modify the data stored in the blockchain
        // and the variable will be lost once the function execution ends
        myMemStruct.foo++;

        // create a struct in memory
        MyStruct memory aMemStruct = MyStruct(0);
    }

    function _f(
        uint[] storage _arr,
        mapping(uint => address) storage _map,
        MyStruct storage _myStruct
    ) internal {
        // do something with storage variables
    }

    function _f2(
        uint[] memory _arr,
        MyStruct memory _myStruct
    ) internal {
        // do something with storage variables
    }



    // You can return memory variables
    function g(uint[] memory _arr) public returns (uint[] memory) {
        // do something with memory array
        uint[] memory my =new uint[](10);
        for(uint i=0;i<10;i++){
            my[i]=i;
        }
        return my;
    }

    event Array(uint,uint);//记录log

    function h(uint[] calldata _arr) external {
        // do something with calldata array
        for(uint i=0; i< _arr.length;i++){
            emit Array(i, _arr[i]);
        }
    }
}
