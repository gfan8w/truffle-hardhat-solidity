const {
    shouldFail,
    constants,
    expectEvent,
    BN
} = require('openzeppelin-test-helpers');

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();
const IterableSum_Contract = artifacts.require('IterableSum');
const IterableMapping_Lib_Contract = artifacts.require('IterableMapping');

contract('Verify', accounts => {
    const [owner, alice, bob, eve, ...others] = accounts;
    console.log("owner address: ",owner);

    beforeEach(async () => {
        IterableMappingLib = await IterableMapping_Lib_Contract.new();
        await IterableSum_Contract.detectNetwork();
        IterableSum_Contract.link("IterableSum", IterableMappingLib.address);
        IterableSumInst = await IterableSum_Contract.new();


    });


    // 命令： truffle test ./test/TestIterableSum.js
    describe('#IterableSum', () => {
        it('IterableSum', async () => {

            let si=0;
            for(let i=1;i<2;i++){
                si =await IterableSumInst.insert(i,i);
            }

            console.log("size:",si.toString())

            let sum =await IterableSumInst.sum();

            console.log("sum:",sum)


        });


    });





});
