import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, Wallet,utils } from "ethers";
import { ethers } from "hardhat";
import { randomBytes, randomInt } from "crypto";
import { AirDropToken, AirDropToken__factory} from "../../typechain-types";

interface drop {
    index: number,
    who: string,
    amount: BigNumber
}

describe("AirDropToken", async () => {
    let owner: SignerWithAddress;
    let guy: SignerWithAddress;

    let listToAirdrop: drop[] = new Array(258)
        .fill(0)
        .map(() => new Wallet(randomBytes(32).toString("hex")).address)
        .map((x,i) => {
            return {
                index: i,
                who: x,
                amount: BigNumber.from(randomInt(9) + 1),
            };
        });

    let airdrop: AirDropToken;

    beforeEach(async () => {

    });

    it("Should claim", async () => {

        const signers = await ethers.getSigners();
        owner = signers[0];
        guy = signers[1];

        let amountToClaim = BigNumber.from(0);

        listToAirdrop.forEach((x) => (amountToClaim = amountToClaim.add(x.amount)));

        const root = computeRootHash(listToAirdrop)

        airdrop = await new AirDropToken__factory(owner).deploy(
            "merkel","ddl",1, root,0);

        await airdrop.deployed();

        let idx = 10;
        let merkleProof = computeMerkleProof(listToAirdrop, idx);

        const tx = await airdrop.redeemPackage(idx, listToAirdrop[idx].who, listToAirdrop[idx].amount, merkleProof)
        const receipt = await tx.wait()
        console.log("receipt:", receipt)
        //emit Transfer(address(0), recipient, amount);


    });


});



function reduceMerkleBranches(leaves: any[]) {
    var output = [];

    while (leaves.length) {
        var left = leaves.shift();
        var right = (leaves.length === 0) ? left: leaves.shift();
        //output.push(ethers.utils.keccak256(ethers.utils.concat([ left, right ])));
        output.push(ethers.utils.keccak256(left + right.substring(2)));
    }

    output.forEach(function(leaf) {
        leaves.push(leaf);
    });
}


function expandLeaves(balances: drop) {
    var addresses = Object.keys(balances);

    addresses.sort(function(a, b) {
        var al = a.toLowerCase(), bl = b.toLowerCase();
        if (al < bl) { return -1; }
        if (al > bl) { return 1; }
        return 0;
    });

    return addresses.map(function(a, i) { return { address: a, balance: balances[a], index: i }; });
}

// ethers.utils.solidityKeccak256(types, [ leaf.index, leaf.address, leaf.balance ]);
var zeros32 = '0000000000000000000000000000000000000000000000000000000000000000';
function hash(index:number, address:string, balance:string) {
    let indexStr = zeros32 + (index).toString(16);
    indexStr = indexStr.substring(indexStr.length - 64);
    address = address.substring(2)
    balance = zeros32 + balance.substring(2);
    balance = balance.substring(balance.length - 64);
    return ethers.utils.keccak256('0x' + indexStr + address + balance);
}

function getLeaves(balances: drop[]): string[] {
    //var leaves = expandLeaves(balances);

    return balances.map(function(leaf) {
        return hash(leaf.index, leaf.who, utils.hexZeroPad(leaf.amount.toHexString(), 32));
    });
}

function computeRootHash(balances: drop[]):string {
    var leaves = getLeaves(balances);

    while (leaves.length > 1) {
        reduceMerkleBranches(leaves);
    }

    return leaves[0];
}

function computeMerkleProof(balances: drop[], index:number) {
    let leaves = getLeaves(balances);

    if (index == null) { throw new Error('address not found'); }

    let path = index;

    let proof = [ ];
    while (leaves.length > 1) {
        if ((path % 2) == 1) {
            proof.push(leaves[path - 1])
        } else {
            proof.push(leaves[path + 1])
        }

        // Reduce the merkle tree one level
        reduceMerkleBranches(leaves);

        // Move up
        path = parseInt((path / 2).toString());
        //path = Math.floor(path / 2);
    }

    return proof;
}

