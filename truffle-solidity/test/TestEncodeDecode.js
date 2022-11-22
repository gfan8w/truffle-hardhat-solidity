const {
    shouldFail,
    constants,
    expectEvent,
    BN
} = require('openzeppelin-test-helpers');

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

const EncodeDecodeFactory = artifacts.require('EncodeDecode');



contract('Call&DelegateCall', accounts => {
    const [owner, alice, bob, eve, ...others] = accounts;
    console.log("owner address: ",owner);

    beforeEach(async () => {
        EncodeDecodeFactoryInst = await EncodeDecodeFactory.new({from: owner});
    });





    describe('#callWithEncodeSignature()', () => {
        it('encodeDecodeTransfer ok', async () => {
            let transferCode = await EncodeDecodeFactoryInst.encodeTransfer()
            console.log("transferCode:",transferCode)

            let result = await EncodeDecodeFactoryInst.decodeTransfer(transferCode)

            console.log("decode result:",result)
        });
    });




});
