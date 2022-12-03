

目前来说常见的随机数获取有两种：使用区块变量生成随机数，使用预言机来生成随机数。

使用区块变量生成随机数

我们先了解一下常见的区块变量有哪些：

block.basefee(uint)：当前区块的基本费用

block.chainid(uint)：当前链 id

block.coinbase()：当前区块矿工地址 address payable

block.difficulty(uint)：当前区块难度

block.gaslimit(uint)：当前区块 gaslimit

block.number(uint)：当前区块号

block.timestamp(uint)：自 Unix 纪元以来的当前区块时间戳（以秒为单位）

blockhash(uint blockNumber) returns (bytes32)：给定区块的哈希，仅适用于 256 个最近的区块

其中 block.difficulty, blockhash, block.number 和 block.timestamp 这四个是用得比较多的

由区块数据生成的随机数可能会限制普通用户预测随机数的可能性，但是并不能限制矿工作恶，矿工可以决定一个区块是否被广播，
他们挖出了一个区块不是一定要广播出去也可以直接扔掉，这个就叫矿工的选择性打包。他们可以持续尝试生成随机数，直至得到想要的结果再广播出去。
当然，矿工会这样做的前提是有足够的的利益诱惑，例如可以获得一个很大的奖励池中的奖励，
因此使用区块变量获取随机数的方法更适合于一些随机数不属于核心业务的应用。






















