/**
 * 教程： https://www.dappuniversity.com/articles/web3-js-intro
 *
 * */

var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const rpcURL="HTTP://127.0.0.1:7545"
const account ="0xfc6F6e3e6875fc948D34094f026390516703Dc3E"
const web3 =new Web3(rpcURL);

const account1='0x0fbeb777380eE056e94def021B99BC316B09eA21'
const account2='0xCd757bAE390D3538a27F2f9f82eCA516C5d167af'

const account1_private='3595b109e9c82dac0fcfa109fb6319481cd9db955183fd0ec1e1805ec28a86b4'
const account2_private='73a7343d8b4e9992b7867872303d4a58776072093bccc8706accccae59fbc602'

const account1_private_buff= Buffer.from(account1_private,'hex')
const account2_private_buff= Buffer.from(account2_private,'hex')

web3.eth.getTransactionCount(account1, (err, txCount) => {
    console.log("nonce",txCount)
    console.log("getTransCount Error:",err)
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: account2,
        value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

    const tx = new Tx.Transaction(txObject)
    tx.sign(account1_private_buff)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash)
        console.log("error:",err)



        const data = '0x60806040526040805190810160405280600a81526020017f4441707020546f6b656e000000000000000000000000000000000000000000008152506000908051906020019061004f92919061014e565b506040805190810160405280600481526020017f44415050000000000000000000000000000000000000000000000000000000008152506001908051906020019061009b92919061014e565b506040805190810160405280600f81526020017f4441707020546f6b656e2076312e300000000000000000000000000000000000815250600290805190602001906100e792919061014e565b503480156100f457600080fd5b506000620f4240905080600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080600381905550506101f3565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061018f57805160ff19168380011785556101bd565b828001600101855582156101bd579182015b828111156101bc5782518255916020019190600101906101a1565b5b5090506101ca91906101ce565b5090565b6101f091905b808211156101ec5760008160009055506001016101d4565b5090565b90565b610b99806102026000396000f300608060405260043610610099576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde031461009e578063095ea7b31461012e57806318160ddd1461019357806323b872dd146101be5780635a3b7e421461024357806370a08231146102d357806395d89b411461032a578063a9059cbb146103ba578063dd62ed3e1461041f575b600080fd5b3480156100aa57600080fd5b506100b3610496565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100f35780820151818401526020810190506100d8565b50505050905090810190601f1680156101205780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561013a57600080fd5b50610179600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610534565b604051808215151515815260200191505060405180910390f35b34801561019f57600080fd5b506101a8610626565b6040518082815260200191505060405180910390f35b3480156101ca57600080fd5b50610229600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061062c565b604051808215151515815260200191505060405180910390f35b34801561024f57600080fd5b5061025861089b565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561029857808201518184015260208101905061027d565b50505050905090810190601f1680156102c55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156102df57600080fd5b50610314600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610939565b6040518082815260200191505060405180910390f35b34801561033657600080fd5b5061033f610951565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561037f578082015181840152602081019050610364565b50505050905090810190601f1680156103ac5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156103c657600080fd5b50610405600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506109ef565b604051808215151515815260200191505060405180910390f35b34801561042b57600080fd5b50610480600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610b48565b6040518082815260200191505060405180910390f35b60008054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561052c5780601f106105015761010080835404028352916020019161052c565b820191906000526020600020905b81548152906001019060200180831161050f57829003601f168201915b505050505081565b600081600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60035481565b6000600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561067c57600080fd5b600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561070757600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555081600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109315780601f1061090657610100808354040283529160200191610931565b820191906000526020600020905b81548152906001019060200180831161091457829003601f168201915b505050505081565b60046020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109e75780601f106109bc576101008083540402835291602001916109e7565b820191906000526020600020905b8154815290600101906020018083116109ca57829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a3f57600080fd5b81600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b60056020528160005260406000206020528060005260406000206000915091505054815600a165627a7a723058204c3f690997294d337edc3571d8e77afc5b0e56a2f4bfae6fb59139c8e4eb2f7e0029'
        web3.eth.getTransactionCount(account1, (err, txCount) => {

            console.log("nonce",txCount)
            console.log("getTransCount Error:",err)

            const txObject = {
                nonce: web3.utils.toHex(txCount),
                gasLimit: web3.utils.toHex(1000000), // Raise the gas limit to a much higher amount
                gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                data: data
            }

            const tx = new Tx.Transaction(txObject)
            tx.sign(account1_private_buff)

            const serializedTx = tx.serialize()
            const raw = '0x' + serializedTx.toString('hex')

            web3.eth.sendSignedTransaction(raw, (err, txHash) => {
                console.log('txHash:', txHash)
                console.log("error:",err)

                web3.eth.getTransactionCount(account1, (err, txCount) => {

                    const contractAddress = '0xd63dd655b861CbC2992052a2EFE35cE03435D662'
                    const contractABI = [{
                        "constant": true,
                        "inputs": [],
                        "name": "name",
                        "outputs": [{"name": "", "type": "string"}],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    }, {
                        "constant": false,
                        "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}],
                        "name": "approve",
                        "outputs": [{"name": "success", "type": "bool"}],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }, {
                        "constant": true,
                        "inputs": [],
                        "name": "totalSupply",
                        "outputs": [{"name": "", "type": "uint256"}],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    }, {
                        "constant": false,
                        "inputs": [{"name": "_from", "type": "address"}, {
                            "name": "_to",
                            "type": "address"
                        }, {"name": "_value", "type": "uint256"}],
                        "name": "transferFrom",
                        "outputs": [{"name": "success", "type": "bool"}],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }, {
                        "constant": true,
                        "inputs": [],
                        "name": "standard",
                        "outputs": [{"name": "", "type": "string"}],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    }, {
                        "constant": true,
                        "inputs": [{"name": "", "type": "address"}],
                        "name": "balanceOf",
                        "outputs": [{"name": "", "type": "uint256"}],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    }, {
                        "constant": true,
                        "inputs": [],
                        "name": "symbol",
                        "outputs": [{"name": "", "type": "string"}],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    }, {
                        "constant": false,
                        "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}],
                        "name": "transfer",
                        "outputs": [{"name": "success", "type": "bool"}],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }, {
                        "constant": true,
                        "inputs": [{"name": "", "type": "address"}, {"name": "", "type": "address"}],
                        "name": "allowance",
                        "outputs": [{"name": "", "type": "uint256"}],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    }, {
                        "inputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "constructor"
                    }, {
                        "anonymous": false,
                        "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {
                            "indexed": true,
                            "name": "_to",
                            "type": "address"
                        }, {"indexed": false, "name": "_value", "type": "uint256"}],
                        "name": "Transfer",
                        "type": "event"
                    }, {
                        "anonymous": false,
                        "inputs": [{"indexed": true, "name": "_owner", "type": "address"}, {
                            "indexed": true,
                            "name": "_spender",
                            "type": "address"
                        }, {"indexed": false, "name": "_value", "type": "uint256"}],
                        "name": "Approval",
                        "type": "event"
                    }]

                    const contract = new web3.eth.Contract(contractABI, contractAddress)

                    const txObject = {
                        nonce:    web3.utils.toHex(txCount),
                        gasLimit: web3.utils.toHex(800000), // Raise the gas limit to a much higher amount
                        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                        to: contractAddress,
                        data: contract.methods.transfer(account2, 1000).encodeABI()
                    }

                    const tx = new Tx.Transaction(txObject)
                    tx.sign(account1_private_buff)

                    const serializedTx = tx.serialize()
                    const raw = '0x' + serializedTx.toString('hex')

                    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
                        console.log('Erc 20 txHash:', txHash)
                        console.log("Erc 20 error:", err)

                        // Check Token balance for account1
                        contract.methods.balanceOf(account1).call((err, balance) => {
                            console.log("account1 erc20:",{ err, balance })
                        })

                        // Check Token balance for account2
                        contract.methods.balanceOf(account2).call((err, balance) => {
                            console.log("account1 erc20:",{ err, balance })
                        })

                        contract.getPastEvents(
                            'AllEvents',
                            {
                                fromBlock: 0,
                                toBlock: 'latest'
                            },
                            (err, events) => {
                                console.log("Events:")
                                console.log(events)
                            }
                        )


                    });



                });

            })

        });

    })

});



web3.eth.getBlockNumber().then(console.log)

web3.eth.getBlock('latest').then(console.log)

web3.eth.getBlockNumber().then((latest) => {
    for (let i = 0; i < 10; i++) {

        web3.eth.getBlock(latest - i).then(console.log)
    }
})








