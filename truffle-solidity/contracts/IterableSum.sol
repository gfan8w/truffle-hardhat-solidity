
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./lib/IterableMapping.sol";
// 调用合约
contract IterableSum {
    using IterableMapping for IterableMapping.itmap;
    IterableMapping.itmap data;

    // 插入数据
    function insert(uint key, uint value) public returns(uint size) {
        IterableMapping.insert(data, key, value);
        return data.size;
    }

    // 遍历求和
    function sum() public returns(uint s) {
        for(uint i = IterableMapping.iterate_start(data);
            IterableMapping.iterate_valid(data, i);
            i = IterableMapping.iterate_next(data, i)) {
            (uint key , uint value) = IterableMapping.iterate_get(data, i);
            s += value;
        }
    }
}
