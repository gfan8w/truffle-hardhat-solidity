const {
    shouldFail,
    constants,
    expectEvent,
    BN
} = require('openzeppelin-test-helpers');

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

const CompressCallDataFactory = artifacts.require('CompressCallData');



contract('CompressCallData', accounts => {
    const [owner, alice, bob, eve, ...others] = accounts;
    console.log("owner address: ",owner);

    beforeEach(async () => {
        CompressCallDataInst = await CompressCallDataFactory.new({from: owner});
    });





    describe('#CompressCallData()', () => {
        it('CompressCallData ok', async () => {
            let encode = await CompressCallDataInst.encode(1,2,true, 'a')
            console.log("encode:",encode)

            encode = await CompressCallDataInst.encode2(1,2,true, 'a')
            console.log("encode2:",encode)

            let a = parseInt("10011100001111",2)
            console.log("a:",a)

            let b = parseInt("11111111111111",2)
            console.log("b:",b)
            console.log('b hex:', b.toString(16),b.toString(2))

            let encodePacked = await CompressCallDataInst.encodePacked(1,2,true, 'a')
            console.log("encodePacked result:",encodePacked)
            let param0=9999<<14
            console.log("param1:",param0,param0.toString(16),param0.toString(2))
            let param1 =new BN('9999'), param2=new BN('9999'),param3=new BN('9999'), param5=new BN('9999'),param6=new BN('9999');
            //console.log("param1:",param1<<14,', hex:', (param1<<14).toString(16), ', p:',param1.toString(16),param1.toString(2))
            let address ='0x9ea356d25c658A648f408ABE2322F2f01F12A0F0'
            let address_param =new BN(address.substring(2),16)
            console.log("address:",address_param.toString(16))
            //let param =(param1<<14)+(param2)
            //console.log("param:",param, ', hex:', param.toString(2))

            let flag=0
            !param1.eq(new BN('0'))?flag|=0x1:0
            !param2.eq(new BN('0'))?flag|=0x2:0
            !param3.eq(new BN('0'))?flag|=0x4:0
            !param5.eq(new BN('0'))?flag|=0x10:0
            !param6.eq(new BN('0'))?flag|=0x20:0

            flag =new BN(flag.toString())
            console.log("flag:",flag.toString(16))
            let param=0
            param =flag.shln(160).or(address_param).shln(14).or(param1).shln(14).or(param2).shln(14).or(param3).shln(14).or(param5).shln(14).or(param6)

            console.log("param:",web3.utils.numberToHex(param),param.toString(16),param.toString(2))

            encodePacked = await CompressCallDataInst.encodePacked2(param,address)
            console.log("encodePacked result:",encodePacked)

            encodePacked = await CompressCallDataInst.wrapM(param)
            console.log("encodePacked result:",encodePacked)


            let CompressCallDataContract = new web3.eth.Contract(CompressCallDataFactory.abi,CompressCallDataInst.address)
            let abi = CompressCallDataContract.methods.wrapM(param).encodeABI()
            console.log("encodeABI:",abi)

            abi = CompressCallDataContract.methods.wrapB('0x'+param.toString(16)).encodeABI()
            console.log("encodeABI:",abi)

            web3.utils.padLeft

        });
    });




});

// Convert a hex string to a byte array
function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

// Convert a byte array to a hex string
function bytesToHex(bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
        hex.push((current >>> 4).toString(16));
        hex.push((current & 0xF).toString(16));
    }
    return hex.join("");
}
