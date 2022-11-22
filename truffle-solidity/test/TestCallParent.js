const {
    shouldFail,
    constants,
    expectEvent,
    BN
} = require('openzeppelin-test-helpers');

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

const CallParent_A_Factory = artifacts.require('CPA');
const CallParent_B_Factory = artifacts.require('CPB');
const CallParent_C_Factory = artifacts.require('CPC');
const CallParent_D_Factory = artifacts.require('CPD');


contract('Inheritance', accounts => {
    const [owner, alice, bob, eve, ...others] = accounts;
    console.log("owner address: ",owner);

    beforeEach(async () => {
        Inheritance_A = await CallParent_A_Factory.new();
        Inheritance_B = await CallParent_B_Factory.new();
        Inheritance_C = await CallParent_C_Factory.new();
        Inheritance_D = await CallParent_D_Factory.new();

    });


    // 命令： truffle test --show-events ./test/TestCallParent.js
    describe('#Call Parent', () => {
        it('emit event C ,A', async () => {

            let foo=await Inheritance_D.foo();  // Inheritance_D.foo.call() 会立刻返回结果，但event 不会保留在链上;
            //console.log("foo:",foo);
            const events = await Inheritance_D.getPastEvents('Log');
            //console.log(events);
            events.forEach((e,i)=>{
                console.log(`event index[${i}]: ${e.args.message}`)
            })


        });

        it('emit event C,B,A', async () => {
            let bar=await Inheritance_D.bar();
            //console.log("bar:",bar);
            const events2 = await Inheritance_D.getPastEvents('Log');
            //console.log(events);
            events2.forEach((e,i)=>{
                console.log(`event index[${i}]: ${e.args.message}`)
            })


        });
    });





});
