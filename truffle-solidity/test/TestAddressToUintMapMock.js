const {
    shouldFail,
    constants,
    expectEvent,
    BN
} = require('openzeppelin-test-helpers');

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();
const AddressToUintMapMock_Contract = artifacts.require('AddressToUintMapMock');
const EnumerableMap_Lib_Contract = artifacts.require('EnumerableMap');

contract('AddressToUintMapMock', accounts => {
    const [owner, alice, bob, eve, ...others] = accounts;
    console.log("owner address: ",owner);

    beforeEach(async () => {
        //EnumerableMapInst = await EnumerableMap_Lib_Contract.new();
        //await AddressToUintMapMock_Contract.detectNetwork();
        //AddressToUintMapMock_Contract.link("AddressToUintMapMock", EnumerableMapInst.address);
        AddressToUintMapMockInst = await AddressToUintMapMock_Contract.new();


    });


    // 命令： truffle test ./test/TestIterableSum.js
    describe('set value then get all by index', () => {
        it('Iterable all by index, get all returned value', async () => {

            let si=0;
            for(let i=1;i<9;i++){
                let add ="0x000000000000000000000000000000000000000"+i;
                await AddressToUintMapMockInst.set(add,new BN(i.toString()));
            }

            let size =await AddressToUintMapMockInst.length();
            console.log("size:", size.toString())

            for(let i =0; i<size;i++){
                let result =await AddressToUintMapMockInst.at(new BN(i.toString()));
                console.log(result.key.toString(),result.value.toString());
                let content =await AddressToUintMapMockInst.get(result.key);
                console.log("value:",content.toString())
            }


        });


    });





});
