const Web3 = require('web3')

/// 以32 字节显示分割显示参数
const show= (parameter,parameter_count) => {
    for(let i=0;i<parameter_count;i++){
        console.log("0x"+parameter.substr(i*64+2,64))
    }
}


const web3 =new Web3;
const p1 = web3.eth.abi.encodeParameters(["uint256", "uint256", "uint256"],[1, 2, 3]);
const p2 = web3.eth.abi.encodeParameters(['uint256','string'], ['2345675643', 'Hello!%']);
console.log(p1)
console.log(p2)

let p1_01 = p1.substr((0*64)+2,64);
let p1_02 = p1.substr((1*64)+2,64);
let p1_03 = p1.substr((2*64)+2,64);
console.log("0x"+p1_01)
console.log("0x"+p1_02)
console.log("0x"+p1_03)

show(p2,2);

// 更多参考： https://lilymoana.github.io/evm_part4.html


