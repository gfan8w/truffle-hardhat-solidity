const {
    shouldFail,
    constants,
    expectEvent,
    BN
} = require('openzeppelin-test-helpers');

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

const Inheritance_A_Factory = artifacts.require('A');
const Inheritance_B_Factory = artifacts.require('B');
const Inheritance_C_Factory = artifacts.require('C');
const Inheritance_D_Factory = artifacts.require('D');
const Inheritance_E_Factory = artifacts.require('E');
const Inheritance_F_Factory = artifacts.require('F');


contract('Inheritance', accounts => {
    const [owner, alice, bob, eve, ...others] = accounts;
    console.log("owner address: ",owner);

    beforeEach(async () => {
        Inheritance_A = await Inheritance_A_Factory.new();
        Inheritance_B = await Inheritance_B_Factory.new();
        Inheritance_C = await Inheritance_C_Factory.new();
        Inheritance_D = await Inheritance_D_Factory.new();
        Inheritance_E = await Inheritance_E_Factory.new();
        Inheritance_F = await Inheritance_F_Factory.new();

    });



    describe('#Inheritance', () => {
        it('Inheritance', async () => {

            let a_f = await Inheritance_A.foo();
            console.log("A.foo():",a_f);
            let b_f=await Inheritance_B.foo();
            console.log("B.foo():",b_f);
            let c_f=await Inheritance_C.foo();
            console.log("C.foo():",c_f);
            let d_f=await Inheritance_D.foo();
            console.log("D.foo():",d_f);
            let e_f=await Inheritance_E.foo();
            console.log("E.foo():",e_f);
            let f_f=await Inheritance_F.foo();
            console.log("F.foo():",f_f);

        });
    });




});
