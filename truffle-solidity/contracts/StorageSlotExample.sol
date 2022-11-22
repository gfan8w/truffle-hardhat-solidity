// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

// 参考：https://learnblockchain.cn/books/geth/part7/storage.html


// 一大部分值类型实际上不需要用到 32 字节，如布尔型、uint1 到 uint256。 为了节约存储量，
// 编译器在发现所用存储不超过 32 字节时，将会将其和后面字段尽可能的存储在一个存储中。

// 字段 a 需要 32 字节占用 1 个插槽，存于插槽 0 中。
// b 只需要 1 字节，存于插槽 1 中。
// 因为 插槽 1 还剩余 31 字节可用，而 c 只需要 16 字节，因此 c 也可以存储在插槽 1 中。
// 此时，插槽 1 剩余 15 字节，可以继续存放 d 的一字节。
// 插槽 1 还剩余 14 字节，但是 e 需要 16 字节存储，插槽 1 已不能容纳 e。需将 e 存放到下一个插槽 2 中。

// 在插槽 1 中的 b、c、d 他们将依次从右往左存储于插槽 1 中。读取插槽 1 中的数据得到 data 为：
//0x0000000000000000000000000000010000000000000000000000000000000d0c
//如果希望得到b、c、d 的值，则需要进行分割读取。data 是一串 Hex 字符串，两个字符代表一个字节。

contract StorageSlotExample {
    uint256 a = 11; // 插槽 0
    uint8 b = 12; // 插槽1，1 字节
    uint128 c = 13; // 插槽1，16 字节
    bool d = true; // 插槽1，1 字节
    uint128 e =  14;//插槽2
}


// 字符串 string 和 bytes 实际是一个特殊的 array ，编译器对这类数据有进行优化。如果 string 和 bytes 的数据很短。
// 那么它们的长度也会和数据一起存储到同一个插槽。 具体为：
// 如果数据长度小于等于 31 字节， 则它存储在高位字节（左对齐），最低位字节存储 length * 2。
// 如果数据长度超出 31 字节，则在主插槽存储 length * 2 + 1， 数据照常存储在 keccak256(slot) 中。
contract StorageString {
    string a  = "a short string";
    string b  = "I am a very very long string, I just want to store at two slots, It's really nice to meet you, How are you? I am oK";
}

// 动态数组 T[] 由两部分组成，数组长度和元素值。在 Solidity 中定义动态数组后，将在定义的插槽位置存储数组元素数量，
// 元素数据存储的起始位置是：keccak256(slot)，每个元素需要根据下标和元素大小来读取数据。

// 定义两个数组 a 和 b，都有 5 个相同初始值。 a 和 b 在插槽 0 和 1 上分别存储他们的长度值 5，而数组元素值存储有所不同（紧缩存储）。
// 因为数组 a 元素宽度(width)是 2 字节，因此一个插槽可以存储 16 个元素，而数组 b 则只能是一个插槽存储一个元素（uint256 需要用 32 字节存储）。
contract StorageDynamicArray {
    uint16[] public a =  [401,402,403,405,406];
    uint256[] public b =  [401,402,403,405,406];
}



// 字典的存储布局是直接存储 Key 对应的 value，每个 Key 对应一份存储。
// 一个 Key 的对应存储位置是 keccak256(key.slot)，其中.是拼接符合，
// 实际上编码时进行拼接abi.encodePacked(key,slot); 可直接获得 map[key] 的存储位置。

// 字段 a 定义在 0 插槽，初始化合约时有添加两个key u1 和 u2。
// 那么 u1的存储位置就是： keccak256("u1",0)，u2 存储在 keccak256("u2",0)中。
// 调用 SlotHelp.mappingValueSlotString(0,"u1") (见下) 可计算出存储位置
contract StorageMapLayout {
    mapping (string => uint256) a;

    constructor() {
        a["u1"]=18;
        a["u2"]=19;
    }
}











// keccak256 是 Solidity 中合约中使用的 sha3 函数，不等同于 web3.sha 。
// 为了计算方便，我定义了一个 Solot 的帮助类来计算存储位置，
contract SlotHelp {

    // 获取字符串的存储起始位置
    function dataSolot(uint256 slot) public pure returns (bytes32) {
        bytes memory slotEncoded  = abi.encodePacked(slot);
        return  keccak256(slotEncoded);
    }

    // 获取字符串 Key 的字典值存储位置
    function mappingValueSlotString(uint256 slot,string memory key ) public pure returns (bytes32) {
        bytes memory slotEncoded  = abi.encodePacked(key,slot);
        return  keccak256(slotEncoded);
    }

    //用于计算槽位偏移，把上面2个函数计算得到的槽位加上一个偏移，得到新槽位
    function calcAddress(bytes32 slot, uint256 offset) public pure returns (bytes32) {
        return bytes32(uint256(slot)+offset);
    }
}


