async function main() {
    const { ethers } = require("ethers");

    const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/c1092815dc56459f9bf6faa712857e55");

    const signer = provider.getSigner()

// Look up the current block number
    let block_number = await provider.getBlockNumber()

    console.log("latest block number:", block_number)

    let nonce =await provider.getTransactionCount("0xA7e6d6bBfe7E938561863316239Fa94aFbda7B41");
    console.log("nonce:",nonce)
}



main().catch(e=>console.log(e))
