const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider('http://123.58.217.221:9933');

(async ()=> {

    let b =await provider.getBlockNumber();
    console.log("current block:",b);

})()


