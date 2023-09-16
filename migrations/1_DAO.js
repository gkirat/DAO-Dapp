const Migrations = artifacts.require("Dao");

module.exports = function(deployer){
    deployer.deploy(Migrations,5000,5000,51)
}