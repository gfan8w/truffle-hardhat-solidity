var Adoption = artifacts.require("Adoption");
var ERC20MinterBurnerPauser = artifacts.require("ERC20MinterBurnerPauser");
const IterableSum_Contract = artifacts.require('IterableSum');
const IterableMapping_Lib_Contract = artifacts.require('IterableMapping');

// 强制重新部署： truffle  migrate --reset

module.exports = function(deployer) {
    deployer.deploy(Adoption);
    deployer.deploy(ERC20MinterBurnerPauser,"SARO","SARO",18);

    //let address= ERC20MinterBurnerPauser.deployed();
    //console.log("ERC20MinterBurnerPauser contract address:",address)
    deployer.deploy(IterableMapping_Lib_Contract).then(() => {
        deployer.deploy(IterableSum_Contract);
    });
    deployer.link(IterableMapping_Lib_Contract, IterableSum_Contract);
};
