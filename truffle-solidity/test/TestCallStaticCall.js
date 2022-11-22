const {
    shouldFail,
    constants,
    expectEvent,
    BN
} = require('openzeppelin-test-helpers');

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

const GardenTestContractFactory = artifacts.require('GardenTestContract');
const GardenTestTokenFactory = artifacts.require('GardenTestToken');


contract('Call&staticcall', accounts => {
    const [owner, alice, bob, eve, ...others] = accounts;
    console.log("owner address: ",owner);

    beforeEach(async () => {
        GardenTestContractInst = await GardenTestContractFactory.new({from: owner});
        GardenTestTokenInst = await GardenTestTokenFactory.new({from: owner});

    });





    describe('#staticcall()', () => {
        it('staticcall ok', async () => {
            let address=GardenTestTokenInst.address
            let balance = await GardenTestContractInst.getBalanceOf(address)
            console.log("balance:",balance)

            let total =await GardenTestContractInst.getTotalSupply(address)
            console.log("calldata:", total.toString())

        });
    });




});
