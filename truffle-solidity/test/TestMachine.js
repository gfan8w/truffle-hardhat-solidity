const {
    shouldFail,
    constants,
    expectEvent,
    BN
} = require('openzeppelin-test-helpers');

// helpers 的参考文档：https://docs.openzeppelin.com/test-helpers/0.5/api


const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

const StorageFactory = artifacts.require('Storage');
const MachineFactory = artifacts.require('Machine');
const CalculatorFactory = artifacts.require('Calculator');


contract('Machine', accounts => {
    const [owner, ...others] = accounts;
    console.log("owner address: ",owner);


    beforeEach(async () => {
        Storage = await StorageFactory.new(new BN('0'));
        Machine = await MachineFactory.new(Storage.address);

        console.log("machine address: ",Machine.address);
    });



    describe('#saveValue()', () => {
        it('should successfully save value', async () => {
            await Machine.saveValue(new BN('54'));
            let a =(await Storage.val());
            console.log("a:",a.toString())
            a.should.be.bignumber.equal(new BN('54'));
        });
    });


    // 测试 call
    describe('#addValuesWithCall()', () => {
        let Calculator;

        beforeEach(async () => {
            Calculator = await CalculatorFactory.new();
        });

        it('should successfully add values with call', async () => {
            const result = await Machine.addValuesWithCall(Calculator.address, new BN('1'), new BN('2'));
            expectEvent.inLogs(result.logs, 'AddedValuesByCall', {
                a: new BN('1'),
                b: new BN('2'),
                success: true,
            });
            console.log("result.receipt.from: ",result.receipt.from);
            console.log("result.receipt.to: ",result.receipt.to);
            let cal_result=await Calculator.calculateResult();
            let mach_result=await Machine.calculateResult();
            let mach_user =await Machine.user();
            let cal_user =await Calculator.user();

            console.log("Calculator result: ",cal_result.toString());
            console.log("Machine result: ",mach_result.toString());
            console.log("Machine user: ",mach_user);
            console.log("Calculator user: ",cal_user);

            (result.receipt.from).should.be.equal(owner.toString().toLowerCase());
            (result.receipt.to).should.be.equal(Machine.address.toString().toLowerCase());
            cal_result.toString().should.be.equal('3');
            mach_result.toString().should.be.equal('0');
            mach_user.should.be.equal(constants.ZERO_ADDRESS);
            cal_user.should.be.equal(Machine.address);
        });
    });

    // 测试  DelegateCall
    describe('#addValuesWithDelegateCall()', () => {
        let Calculator;

        beforeEach(async () => {
            Calculator = await CalculatorFactory.new();
        });

        it('should successfully add values with delegate call', async () => {
            const result = await Machine.addValuesWithDelegateCall(Calculator.address, new BN('1'), new BN('2'));
            expectEvent.inLogs(result.logs, 'AddedValuesByDelegateCall', {
                a: new BN('1'),
                b: new BN('2'),
                success: true,
            });
            (result.receipt.from).should.be.equal(owner.toString().toLowerCase());
            (result.receipt.to).should.be.equal(Machine.address.toString().toLowerCase());
            // Calculator storage DOES NOT CHANGE!
            (await Calculator.calculateResult()).should.be.bignumber.equal(new BN('0'));

            // Only calculateResult in Machine contract should be changed
            (await Machine.calculateResult()).should.be.bignumber.equal(new BN('3'));
            (await Machine.user()).should.be.equal(owner);
            (await Calculator.user()).should.be.equal(constants.ZERO_ADDRESS);
        });
    });


});
