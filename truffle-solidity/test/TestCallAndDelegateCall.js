const {
    shouldFail,
    constants,
    expectEvent,
    BN
} = require('openzeppelin-test-helpers');

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

const LooCallAndDelegateCallFactory = artifacts.require('LooCallAndDelegateCall');
const FooFactory = artifacts.require('FooCallAndDelegate');


contract('Call&DelegateCall', accounts => {
    const [owner, alice, bob, eve, ...others] = accounts;
    console.log("owner address: ",owner);

    beforeEach(async () => {
        LooCallAndDelegateCallInst = await LooCallAndDelegateCallFactory.new({from: owner});
        FooInst = await FooFactory.new({from: owner});
        console.log("foo address:",FooInst.address)

    });



    describe('#callWithInstance()', () => {
        it('callWithInstance ok', async () => {
            let address=FooInst.address
            let a = await FooInst.bar(1,2)
            console.log("a:",a.toString())
            let c = await LooCallAndDelegateCallInst.callWithInstance(address,1,2)
            console.log("c:",c)

            const events = await LooCallAndDelegateCallInst.getPastEvents();
            //console.log(events);
            events.forEach((e, i) => {
                console.log(`event index[${i}]: `,e.args["0"],e.args["1"].toString())
            })
        });
    });

    describe('#callWithEncodeSignature()', () => {
        it('callWithEncodeSignature ok', async () => {
            let address=FooInst.address
            let c = await LooCallAndDelegateCallInst.callWithEncodeSignature(address,1,2)
            console.log("c:",c)

            const events = await LooCallAndDelegateCallInst.getPastEvents();
            //console.log(events);
            events.forEach((e, i) => {
                console.log(`event index[${i}]: `,e.args["0"],e.args["1"].toString())
            })
        });
    });


    // describe('#callWithEncode()', () => {
    //     it('callWithEncode ok', async () => {
    //         let address=FooInst.address
    //         let c = await LooCallAndDelegateCallInst.callWithEncode(address,1,2)
    //         console.log("c:",c)
    //     });
    // });



});
