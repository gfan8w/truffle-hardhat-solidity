/**
 * 教程： https://medium.com/moonbeam-network/using-the-ethereum-web3-library-to-send-transactions-in-moonbeam-5b8593767904
 *
 * */

const Web3 = require('web3');

// Variables definition
const privKey =
    '86438e97633a539462ecdba62ca1d07812c87950027e067cb855172d41821b6c'; // Genesis private key
const addressFrom = '0xeFad6C7521763ce95Fda00b5E66630aB53E0E663';
const addressTo = '0x292e141bc8cBe47c88765236A73DafC895A40127';
const web3 = new Web3('http://123.58.217.221:9933');

// Create transaction
const deploy = async () => {
    console.log(
        `Attempting to make transaction from ${addressFrom} to ${addressTo}`
    );

    const createTransaction = await web3.eth.accounts.signTransaction(
        {
            from: addressFrom,
            to: addressTo,
            value: web3.utils.toWei('1', 'ether'),
            gas: '21000',
        },
        privKey
    );

    // Deploy transaction
    const createReceipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
    );
    console.log(
        `Transaction successful with hash: ${createReceipt.transactionHash}`
    );

    let b = await web3.eth.getBalance(addressTo)
    console.log("balances:",web3.utils.fromWei(b,"ether").toString())
};

deploy();







