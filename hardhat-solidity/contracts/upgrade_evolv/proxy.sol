
// 初代版本的升级代理模式，合约中有个fallback函数， 其他任何不在本合约中的函数都进入fallback函数中。
// 此模式存在问题： Proxy selector clashing，函数名字冲突。
// proxyOwner() = clash550254402()的 hash 值相同

// 之后衍生出 Transparent Proxies 模式， 不是proxy owner的调用都透传。但函数名冲突依然存在，但只是影响到proxy owner。



// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Proxy {

    address add;

    function proxyOwner() public view returns(address){return add;}

    // 编译器报名字冲突：TypeError: Function signature hash collision for clash550254402()
    //function clash550254402() public view returns(address){return add;}

    function setProxyOwner(address _owner) public returns(address){}

    function implementation() public view returns(address){return add;}

    function setImplementation(address _implementation) internal returns(address){return add;}

    function upgrade(address _implementation) public {
        require(msg.sender == proxyOwner());
        setImplementation(_implementation);
    }

    // fallback 函数
    fallback () payable external {
        address _impl = implementation();
        require(_impl != address(0));

        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize())
            let result := delegatecall(gas(), _impl, ptr, calldatasize(), 0, 0)
            let size := returndatasize()
            returndatacopy(ptr, 0, size)

            switch result
            case 0 { revert(ptr, size) }
            default { return(ptr, size) }
        }
    }

}
