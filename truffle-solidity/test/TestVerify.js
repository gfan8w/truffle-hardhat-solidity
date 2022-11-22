const {
    shouldFail,
    constants,
    expectEvent,
    BN
} = require('openzeppelin-test-helpers');

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

const Verify_Factory = artifacts.require('Verify');


contract('Verify', accounts => {
    const [owner, alice, bob, eve, ...others] = accounts;
    console.log("owner address: ", owner);



    beforeEach(async () => {
        VerifyInst = await Verify_Factory.new();

    });


    // 命令： truffle test ./test/TestVerify.js
    // hashMessage  r s v 来自 ../contract/Verify/index.html的计算
    describe('#verify', () => {
        it('VerifyMessage', async () => {

            let hashMessage = "0x1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8";
            let r = "0x81a650be2d7eb06ef01a8fd13743d1dad55a1a391ebacbb2f4316b65f9031e1a";
            let s = "0x4c6b117756015bf51160e090d2036ba130d33c3ed17945bf4749194a9be4d1db"
            let v = 27;

            let foo = await VerifyInst.VerifyMessage(hashMessage, v, r, s);
            console.log("pub address:", foo.toString());  // 得到的地址就是原来签名该信息的地址

            const events = await VerifyInst.getPastEvents();
            //console.log(events);
            events.forEach((e, i) => {
                console.log(`event index[${i}]: ${e.args.message}`)
            })

            hashMessage = '0xeca14c12f69940e15b9c9ed344a2e480a13226965c5f179c77d184c290a729b7'
            let signature = '0x829a7d681d9b03b2b270676200d21e52cc0cc5eb751830d19d0d1a158f8476f97939685affdb4af5cec2c1bc7360b6a607c255dc53a449f15015633b65d8d5a11c'
            r = signature.slice(0, 66);
            s = "0x" + signature.slice(66, 130);
            v = parseInt(signature.slice(130, 132), 16);
            console.log({ r, s, v });
            let foo1 = await VerifyInst.VerifyMessage(hashMessage, v, r, s);
            console.log("pub address:", foo1.toString());

            //let sig = web3.eth.personal.sign(hashMessage,accounts[0],'password')
            //console.log("eth.personal.sign:",sig)
        });


    });

    describe('#keccak256', () => {
        it('soliditySha3 result matches from contract keccak256', async function () {

            var msg = '0x8CbaC5e4d803bE2A3A5cd3DbE7174504c6DD0c1C'

            let kec256 = web3.utils.soliditySha3(web3.eth.abi.encodeParameters(['string', 'bytes32'], ["\x19Ethereum Signed Message:\n32", msg]))

            var result = await VerifyInst.hashToKeccak256.call(msg)
            assert.equal(result, kec256)
        })

    })

    // describe('#verify', () => {
    //     it('VerifyMessage2', async () => {
    //
    //         let hashMessage="0x732e11262fc8fc426207b0cfa314fceca5e38c0eca726902f6810313342f6d32";
    //         var sig = web3.eth.sign(address, hashMessage).slice(2)
    //         var r = `0x${sig.slice(0, 64)}`
    //         var s = `0x${sig.slice(64, 128)}`
    //         var v = web3.toDecimal(sig.slice(128, 130)) + 27
    //
    //         let foo=await VerifyInst.VerifyMessage(hashMessage,v,r,s);
    //         console.log("pub address:",foo.toString());  // 得到的地址就是原来签名该信息的地址
    //
    //         const events = await VerifyInst.getPastEvents();
    //         //console.log(events);
    //         events.forEach((e,i)=>{
    //             console.log(`event index[${i}]: ${e.args.message}`)
    //         })
    //     });
    //
    //
    // });


});
