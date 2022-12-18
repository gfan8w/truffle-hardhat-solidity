// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;



contract CallDataInline {
    // calldata 等同于 args 参数。
    function add(uint256 a1, uint256 b1) public view returns (uint256) {
        uint256 result;
        assembly {
            let a := mload(0x40)  // 加载了0x40这个地址，这个地址EVM存储空闲memory的指针，然后我们用a重命名了这个地址
            let b := add(a, 32)   // 用b重命名了a偏移32字节以后的空余地址，到目前为止这个地址所指向的内容还是空的。
            calldatacopy(a, 4, 32) // 把calldata的从第4字节到第36字节的数据拷贝到了a中,
                                   // 偏移要从4开始, 前四位是存储函数指纹的，计算公式是bytes4(keccak256(“add(uint256, uint256)”))，
                                   // 从第四位开始才是args
            calldatacopy(b, add(4, 32), 32) // 把36到68字节的数据拷贝到了b中
            result := add(mload(a), mload(b)) // 把栈中的a，b加载到内存中相加
        }
    }

    function add2(uint256 a, uint256 b) public view returns (uint256) {
        return a + b;
    }
}

/*
EVM提供的用于操作memory的指令有三个：

Mload加载一个字从stack到内存； 一个字 32bytes，256bits
Mstore存储一个值到指定的内存地址，格式mstore（p，v），存储v到地址p；
Mstore8存储一个byte到指定地址 ；
当我们操作内存的时候，总是需要加载0x40，因为这个地址保存了空闲内存的指针，避免了覆盖已有的数据。

Storage
Storage是一个可以读写修改的持久存储的空间，也是每个合约持久化存储数据的地方。Storage是一个巨大的map，一共2^256个插槽，一个插糟有32byte。
EVM提供的用于操作storage的指令有两个：

Sload用于加载一个字到stack中；
Sstore用于存储一个字到storage中；
solidity将定义的状态变量，映射到插糟内，对于静态大小的变量从0开始连续布局，对于动态数组和map则采用了其他方法

*/

