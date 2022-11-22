const {
    shouldFail,
    constants,
    expectEvent,
    BN
} = require('openzeppelin-test-helpers');

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

const UintUint256_Factory = artifacts.require('uintuint256');


contract('uintuint256', accounts => {
    const [owner, alice, bob, eve, ...others] = accounts;
    console.log("owner address: ",owner);

    beforeEach(async () => {
        UintUint256Inst = await UintUint256_Factory.new();

    });


    // 命令： truffle test ./test/TestUintUint256.js
    describe('#uint-uint256-sig', () => {
        it('sig', async () => {

            let sig = await UintUint256Inst.getSig();
            console.log("transfer(address, uint) sig:",sig["0"])
            console.log("transfer(address, uint256) sig:",sig["1"])

        });

    });


});
