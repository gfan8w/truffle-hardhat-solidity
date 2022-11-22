const {
    shouldFail,
    constants,
    expectEvent,
    BN
} = require('openzeppelin-test-helpers');

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

const AndOrShift_Factory = artifacts.require('AndOrShift');


contract('AndOrShift', accounts => {
    const [owner, alice, bob, eve, ...others] = accounts;
    console.log("owner address: ",owner);

    beforeEach(async () => {
        AndOrShift = await AndOrShift_Factory.new();

    });


    // 命令： truffle test --show-events ./test/TestCallParent.js
    describe('#and', () => {
        it(' 2 & 3 = 2', async () => {

            let foo=await AndOrShift.and();
            console.log("and:",foo.toString());
            // const events = await AndOrShift.getPastEvents();
            // //console.log(events);
            //
            // console.log(`event index[${i}]: ${e.event}`)
            //
            // for (const [key, value] of Object.entries(e.args)) {
            //     console.log(` - ${key}: ${value}`);
            // }
        });


        it('integerToString', async () => {

            let foo=await AndOrShift.integerToString(87654343434);
            console.log("foo String:",foo.toString());

        });

        it('0xb5 & 0x56', async () => {

            let foo=await AndOrShift.and2();
            console.log("f0xb5 & 0x56:",foo.toString());

        });

        it('shift', async () => {

            let foo=await AndOrShift.shift();
            console.log("shift 1<<18",foo.toString());

        });

        it('multi()', async () => {

            let foo=await AndOrShift.multi();
            console.log("multi()",foo.toString());

        });
    });





});
