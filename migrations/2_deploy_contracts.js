
var Bankcoin = artifacts.require("./Bankcoin.sol");
var Helpers = artifacts.require("./Helpers.sol");
var Safemath = artifacts.require("./Safemath.sol");
module.exports = function(deployer) {
	deployer.deploy(Helpers);
	deployer.link(Helpers, Bankcoin);
	deployer.deploy(Safemath);
	deployer.link(Safemath, Bankcoin);
	deployer.deploy(Bankcoin);
};
