const {
    shouldFail,
    constants,
    expectEvent,
    BN
} = require('openzeppelin-test-helpers');

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

const CallAndDelegateCallTestFactory = artifacts.require('CallAndDelegateCallTest');
const CallAndDelegatePersonFactory = artifacts.require('CallAndDelegatePerson');


contract('Call&DelegateCall', accounts => {
    const [owner, alice, bob, eve, ...others] = accounts;
    console.log("owner address: ",owner);

    beforeEach(async () => {
        CallAndDelegateCallTestInst = await CallAndDelegateCallTestFactory.new({from: owner});
        CallAndDelegatePersonInst = await CallAndDelegatePersonFactory.new({from: owner});

    });





    describe('#callWithEncodeSignature()', () => {
        it('callWithEncodeSignature ok', async () => {
            let address=CallAndDelegatePersonInst.address
            let c = await CallAndDelegateCallTestInst.callData(address)
            console.log("c:",c)

            let fail =await CallAndDelegatePersonInst.getFail()
            console.log("calldata fail:", fail)

            const events = await CallAndDelegateCallTestInst.getPastEvents();
            //console.log(events);
            events.forEach((e, i) => {
                console.log(`event index[${i}]: `,e.args["0"],e.args["1"]?.toString())
            })
        });
    });




});
