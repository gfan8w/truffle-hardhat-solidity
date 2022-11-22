const {
    shouldFail,
    constants,
    expectEvent,
    BN
} = require('openzeppelin-test-helpers');

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

const QuickSortSample_Factory = artifacts.require('QuickSortSample');
const QuickSortLib_Factory = artifacts.require('QuickSort');

contract('QuickSort', accounts => {
    const [owner, alice, bob, eve, ...others] = accounts;
    console.log("owner address: ",owner);

    beforeEach(async () => {
        QuickSortLib =await QuickSortLib_Factory.new();

        await QuickSortSample_Factory.detectNetwork();
        QuickSortSample_Factory.link("QuickSort", QuickSortLib.address);

        QuickSortInst = await QuickSortSample_Factory.new();

    });


    // 命令： truffle test ./test/TestQuickSort.js
    describe('#quick_sort', () => {
        it('quick_sort', async () => {
            let data =[1,2,3,4,5]
            let sort = await QuickSortInst.sort(data);
            console.log(sort.map(x=>x.toString()));


             data =[5,4,3,2,1,0]
             sort = await  QuickSortInst.sort(data);
            console.log(sort.map(x=>x.toString()));

            data =[1,4,3,5,2]
            sort =  await QuickSortInst.sort(data);
            console.log(sort.map(x=>x.toString()));

            data =[1]
            sort =  await QuickSortInst.sort(data);
            console.log(sort.map(x=>x.toString()));

            data =[900000, 1,2121212,2342343,1324,124,45,6656,98,12,234,345,122344,34455553,431111488,99575,234234211,98989,113123]
            sort =  await QuickSortInst.sort(data);
            console.log(sort.map(x=>x.toString()));

            const len=10000;
            data =[];
            for(let i =len;i>=0;i--){
                data.push(i)
            }

            sort =  await QuickSortInst.sort(data);

            for(let i =0;i<=len;i++){
                 if(sort[i].toString()==i.toString()){

                 }else {
                     console.log("miss match:",i,",value:",sort[i].toString())
                 }


            }


        });


    });


    describe('#quick_sort_struct', () => {
        it('quick_AddressWars', async () => {
            let data =[
                [5,constants.ZERO_ADDRESS],
                [2,constants.ZERO_ADDRESS],
                [1,constants.ZERO_ADDRESS],
                [19,constants.ZERO_ADDRESS],
                [7,constants.ZERO_ADDRESS],
                ]
            let sort = await QuickSortInst.sortAddressWar(data);
            console.log(sort)
            console.log(sort.map(x=>{[war,add]=x; return war.toString()}));

        });


    });


});
