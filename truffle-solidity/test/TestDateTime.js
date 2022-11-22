const {
    shouldFail,
    constants,
    expectEvent,
    BN
} = require('openzeppelin-test-helpers');

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

const DateTime_Factory = artifacts.require('DateTime');


contract('DateTime', accounts => {
    const [owner, alice, bob, eve, ...others] = accounts;
    console.log("owner address: ",owner);

    beforeEach(async () => {
        DateTimeInst = await DateTime_Factory.new(2);

    });


    // 命令： truffle test ./test/TestDateTime.js
    describe('#DateTime', () => {
        it('DateTime', async () => {

            // JS date object with current date
            const today = new Date();

            // ⚠️ JS returns the value in miliseconds
            const mseconds = today.getTime();

            // divided to get the just seconds
            const seconds = Math.floor(mseconds / 1000);

            // single liner
            const dateInSecs = Math.floor(new Date().getTime() / 1000);

            let daysDiff = await DateTimeInst.daysDiff();
            assert.equal(daysDiff.toString(), '6', 'wrong answer');

        });


    });





});
