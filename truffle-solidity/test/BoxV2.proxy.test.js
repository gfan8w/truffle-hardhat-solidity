//const { expect } = require('chai');
const { deployProxy, upgradeProxy} = require('@openzeppelin/truffle-upgrades');
// Load compiled artifacts
const Box = artifacts.require('Box');
const BoxV2 = artifacts.require('BoxV2');
// Start test block
contract('BoxV2 (proxy)', function () {
    beforeEach(async function () {
        // Deploy a new Box contract for each test
        this.box = await deployProxy(Box, [42], {initializer: 'store'});
        this.boxV2 = await upgradeProxy(this.box.address, BoxV2);
    });
    // Test case
    it('retrieve returns a value previously incremented', async function () {
        // Increment
        await this.boxV2.increment();
        // Test if the returned value is the same one
        // Note that we need to use strings to compare the 256 bit integers
        //expect((await this.boxV2.retrieve()).toString()).to.equal('43');
        const value = await this.boxV2.retrieve();
        console.log("new value:",value.toString());
        const events = await this.boxV2.getPastEvents();
        //console.log(events);
        events.forEach((e,i)=>{
            console.log(`event index[${i}]: ${e.args.newValue}`)
        })
        assert.equal(value.toString(), '43', 'wrong answer');
    });
});

// 运行：truffle test ./test/BoxV2.proxy.test.js

