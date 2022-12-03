import { ethers } from "hardhat";

// npx hardhat run scripts/self_destruct/game1.ts
async function main() {
    const [owner, otherAccount] = await ethers.getSigners();

    const lockedAmount = ethers.utils.parseEther("10");
    const game1Factory = await ethers.getContractFactory("game1");
    const game1 = await game1Factory.deploy({ value: lockedAmount });
    await game1.deployed();

    const GetFromGameFactory = await ethers.getContractFactory("GetFromGame");
    const getFromGame = await GetFromGameFactory.deploy();
    await getFromGame.deployed();

    const receipt = await getFromGame.deployContract("0x1234",0)
    console.log("getFromGame.deployContract")
    const tsevents = await getFromGame.queryFilter(getFromGame.filters.Deployedd(), receipt.blockHash);
    console.log("tsevents:",tsevents)
    let addrrr =""
    for (const event of tsevents.filter(e => e.transactionHash == receipt.transactionHash)) {
        console.log("event:", event)
        const { addr, ssize } = event.args!;
        console.log(addr?.toHexString(), ssize?.toString());
        addrrr= addr?.toHexString();
    }

    await game1.check(addrrr)

    const balance = await owner.getBalance();
    console.log(`owner Account balance: ${balance.toString()}`);

    await game1.check(getFromGame.address)

    await game1.execute()

    const balance1 = await owner.getBalance();
    console.log(`owner Account balance: ${balance1.toString()}`);


}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
