const Web3 = require('web3');
const { abi } = require('./compile');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
   development: 'http://localhost:9933',
   moonbase: 'https://rpc.api.moonbase.moonbeam.network',
};
const web3 = new Web3(providerRPC.development); //Change to correct network

// Variables
const account_from = {
   privateKey: '99b3c12287537e38c90a9219d4cb074a89a16e9cdb20bf85728ebd97c343e342',
};
const contractAddress = '0xC2Bf5F29a4384b1aB0C063e1c666f02121B6084a';
const _value = 3;

/*
   -- Send Function --
*/
// Create Contract Instance
const incrementer = new web3.eth.Contract(abi, contractAddress);

// Build Increment Tx
const incrementTx = incrementer.methods.increment(_value);

const resetTx = incrementer.methods.reset()

const increment = async () => {
   console.log(
      `Calling the increment by ${_value} function in contract at address: ${contractAddress}`
   );

   // Sign Tx with PK
   const createTransaction = await web3.eth.accounts.signTransaction(
      {
         to: contractAddress,
         data: incrementTx.encodeABI(),
         gas: await incrementTx.estimateGas(),
      },
      account_from.privateKey
   );

   // Send Tx and Wait for Receipt
   const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
   );
   console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);


    // Call Contract
    const data = await incrementer.methods.number().call();
    console.log(`The current number stored is: ${data}`);



    console.log(
        `Calling the reset function in contract at address: ${contractAddress}`
    );

    // Sign resetTx with PK
    const resetTransaction = await web3.eth.accounts.signTransaction(
        {
            to: contractAddress,
            data: resetTx.encodeABI(),
            gas: await resetTx.estimateGas(),
        },
        account_from.privateKey
    );

    // Send Tx and Wait for Receipt
    const resetReceipt = await web3.eth.sendSignedTransaction(
        resetTransaction.rawTransaction
    );
    console.log(`Tx successful with hash: ${resetReceipt.transactionHash}`);

    // Call Contract
    const resetData = await incrementer.methods.number().call();
    console.log(`The current number stored is: ${resetData}`);




};

increment();
