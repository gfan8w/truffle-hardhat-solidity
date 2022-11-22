const {
    shouldFail,
    constants,
    expectEvent,
    BN
} = require('openzeppelin-test-helpers');

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

const AddressAndBytes_Factory = artifacts.require('AddressAndBytes');


contract('Address', accounts => {
    const [owner, alice, bob, eve, ...others] = accounts;
    console.log("owner address: ",owner);

    beforeEach(async () => {
        AddressAndBytesInst = await AddressAndBytes_Factory.new();

    });


    // 命令： truffle test ./test/TestVerify.js
    describe('#verify', () => {
        it('VerifyMessage', async () => {

            let result = await AddressAndBytesInst.getAddress.call();
            console.log(result)

        });


    });





});
