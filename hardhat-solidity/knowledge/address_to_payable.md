
address 转换为一个 address payable 地址


Solidity 0.6.x:

Here is how to cast address to address payable:
```
address addr = 0x****;
address payable wallet = payable(addr);
```

And contract cast to address payable:

```
MyContract addr = MyContract(0x****);
address payable wallet = payable(address(addr));
```


Solidity 0.5.x:

Here is how to cast address to address payable:
```
address addr = 0x****;
address payable wallet = address(uint160(addr));
```

And contract cast to address payable:

```
MyContract addr = MyContract(0x****);
address payable wallet = address(uint160(address(addr)));
```
