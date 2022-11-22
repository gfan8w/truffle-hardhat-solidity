const {
    shouldFail,
    constants,
    expectEvent,
    BN
} = require('openzeppelin-test-helpers');

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

const StorageSlotExample_Factory = artifacts.require('StorageSlotExample');
const StorageString_Factory = artifacts.require('StorageString');
const StorageDynamicArray_Factory = artifacts.require('StorageDynamicArray');
const StorageMapLayout_Factory = artifacts.require('StorageMapLayout');



const SlotHelp_Factory = artifacts.require('SlotHelp');


contract('Verify', accounts => {
    const [owner, alice, bob, eve, ...others] = accounts;
    console.log("owner address: ",owner);

    beforeEach(async () => {
        StorageSlotExampleInst = await StorageSlotExample_Factory.new();

    });


    // 命令： truffle test ./test/TestStorageSlotExample.js
    describe('#StorageSlotExample', () => {
        it('StorageSlotExample', async () => {
            for (let i = 0; i < 3; i++) {
                console.log(await web3.eth.getStorageAt(StorageSlotExampleInst.address, i))
            }

            let v = web3.utils.hexToNumber(await web3.eth.getStorageAt(StorageSlotExampleInst.address, 0))
            console.log("decimal value:", v)

            // 在插槽 1 中的 b、c、d 他们将依次从右往左存储于插槽 1 中。读取插槽 1 中的数据得到 data 为：
            //0x0000000000000000000000000000010000000000000000000000000000000d0c
            //如果希望得到b、c、d 的值，则需要进行分割读取。data 是一串 Hex 字符串，两个字符代表一个字节。
            let bcd = await web3.eth.getStorageAt(StorageSlotExampleInst.address,1)

            let b = parseInt(bcd.substr(66-1*2,1*2),16);
            let c = parseInt(bcd.substr(66-1*2-16*2,16*2),16);
            let d = parseInt(bcd.substr(66-1*2-16*2-1*2,1*2),16);
            console.log(`b:${b}, c:${c}, d:${d}`)

            v = web3.utils.hexToNumber( await web3.eth.getStorageAt(StorageSlotExampleInst.address,2))
            console.log("decimal value:",v)
        });
    });

});


contract('StorageString', accounts => {
    const [owner, alice, bob, eve, ...others] = accounts;
    console.log("owner address: ",owner);

    beforeEach(async () => {
        StorageStringInst = await StorageString_Factory.new();
        SlotHelpInst = await SlotHelp_Factory.new();

    });


    // 命令： truffle test ./test/TestStorageSlotExample.js
    describe('#StorageString_short_string', () => {
        it('StorageString_short_string', async () => {

            //
            // "a short string" 长度是 14，乘以2 =28 =0x1c
            // 合约有两个字段 a 和 b，他们所需要占用的存储各不相同。根据规则一，a 的内容和长度一起存储在插槽 0 中。
            let short_string_hex = await web3.eth.getStorageAt(StorageStringInst.address,0)
            console.log("short sting:",short_string_hex)
            const short_str = web3.utils.hexToUtf8( '0x'+short_string_hex.substr(2,14*2)) // 根据长度可解码 a 的值：
            console.log("short string(utf8):",short_str)

            //而字段 b 需要占用 115 字节 (=web3.fromUtf8(‘I am a very....I am oK’).length/2 -1)，已超过 115 字节。
            // 那么将在插槽 1 中存储值 231(= 115 * 2 + 1): “0x00000000000000000000000000000000000000000000000000000000000000E7”。
            // 而 b 值起始存储在 keccak256(0x1) 中，需要使用连续两个插槽存储。
            //
            // 调用 SlotHelp 函数 dataSolot(1)，得到 b 字符串的起始存储位置：start=0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6。
            // 而 b 字符串需要两个插槽存储，下一个存储位置是 start +1 。

            let long_str ="I am a very very long string, I just want to store at two slots, It's really nice to meet you, How are you? I am oK"
            let long_string_hex = web3.utils.utf8ToHex(long_str);
            let long_string_len = long_string_hex.length/2 -1;
            console.log("long_string_hex:",long_string_hex, " , len:",long_string_len)
            let long_string_slot =await SlotHelpInst.dataSolot(1);
            console.log("long_string_slot:",long_string_slot)

            // 查询long string的长度信息
            let long_string_len_hen_val = await web3.eth.getStorageAt(StorageStringInst.address,1)
            let long_string_len_decimal_val= parseInt(long_string_len_hen_val, 10)
            console.log("long_string_len_hen_val:", long_string_len_hen_val, ", decimal:",long_string_len_decimal_val)

            b1 =await web3.eth.getStorageAt(StorageStringInst.address,long_string_len_hen_val)

            let next1 =addHexValue(long_string_slot,"0x1")
            let next2 = addHexValue(next1,"0x1")
            b1 = await web3.eth.getStorageAt(StorageStringInst.address,"0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6")
            b2 = await web3.eth.getStorageAt(StorageStringInst.address,"0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf7")
            b3 = await web3.eth.getStorageAt(StorageStringInst.address,"0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf8")
            b4 = await web3.eth.getStorageAt(StorageStringInst.address,"0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf9")


            str = web3.utils.hexToUtf8(b1+b2.substring(2)+b3.substring(2)+b4.substr(2))
            console.log("long string(utf8):",str)

            console.log("b offset 0:",long_string_slot)
            let b22 = await SlotHelpInst.calcAddress(long_string_slot,new BN("1"));
            console.log("b offset 1:",b22)
            let b33 = await SlotHelpInst.calcAddress(long_string_slot,new BN("2"));
            console.log("b offset 2:",b33)
            let b44 = await SlotHelpInst.calcAddress(long_string_slot,new BN("3"));
            console.log("b offset 3:",b44)

        });
    });

});



contract('StorageDynamicArray', accounts => {
    const [owner, alice, bob, eve, ...others] = accounts;
    console.log("owner address: ",owner);

    beforeEach(async () => {
        StorageDynamicArrayInst = await StorageDynamicArray_Factory.new();
        SlotHelpInst = await SlotHelp_Factory.new();

    });


    // 命令： truffle test ./test/TestStorageSlotExample.js
    describe('#StorageDynamicArray', () => {
        it('StorageDynamicArray', async () => {

            // 已知:
            // keccak256(0)=0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563
            // keccak256(1)=0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6
            let slot_0 =await SlotHelpInst.dataSolot(0);
            console.log("slot_0:",slot_0)

            let slot_1 =await SlotHelpInst.dataSolot(0);
            console.log("slot_1:",slot_1)

            // 如果要获取 a[3] 值，首先确认 a[3]的存储位置:
            a =await web3.eth.getStorageAt(StorageDynamicArrayInst.address,slot_0)
            console.log("a data:",a)

            // 根据第一项以低位对齐(右对齐)的存储方式，可以知道 a[3] 需要向左偏移 index*width= 6 个字节，值为data.substr(32*2+2-3*2*2,2*2)
            a3 = a.substring(32*2+2-3*2*2,32*2+2-2*2*2)

            console.log("a3 is:",a3,", decimal:",parseInt("0x"+a3,10))


            // b数组, 0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6 +2
            b3 =await web3.eth.getStorageAt(StorageDynamicArrayInst.address,'0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf8')
            console.log("b3 data:",b3)


        });
    });

});


contract('StorageMapLayout', accounts => {
    const [owner, alice, bob, eve, ...others] = accounts;
    console.log("owner address: ",owner);

    beforeEach(async () => {
        StorageMapLayoutInst = await StorageMapLayout_Factory.new();
        SlotHelpInst = await SlotHelp_Factory.new();

    });


    // 命令： truffle test ./test/TestStorageSlotExample.js
    describe('#StorageDynamicArray', () => {
        it('StorageDynamicArray', async () => {

            // 字段 a 定义在 0 插槽，初始化合约时有添加两个key u1 和 u2。
            // 那么 u1的存储位置就是： keccak256("u1",0)，u2 存储在 keccak256("u2",0)中。
            // 调用 SlotHelp.mappingValueSlotString(0,"u1") (见下) 可计算出存储位置，
            let slot_0_u1 =await SlotHelpInst.mappingValueSlotString(0, "u1");
            console.log("slot_0_u1:",slot_0_u1)

            let slot_0_u2 =await SlotHelpInst.mappingValueSlotString(0, "u2");
            console.log("slot_0_u2:",slot_0_u2)


            a =await web3.eth.getStorageAt(StorageMapLayoutInst.address,slot_0_u1)
            console.log("map[`u1`]:",web3.utils.hexToNumber(a))

            b =await web3.eth.getStorageAt(StorageMapLayoutInst.address,slot_0_u2)
            console.log("map[`u2`]:",web3.utils.hexToNumber(b))


        });
    });

});



function addHexValue(c1, c2) {
    let hexStr = (parseInt(c1, 16) + parseInt(c2, 16)).toString(16);
    while (hexStr.length < 6) { hexStr = '0' + hexStr; } // Zero pad.
    return hexStr;
}



