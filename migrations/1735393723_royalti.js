const ContentOwnership = artifacts.require("ContentOwnership");

module.exports = function (deployer) {
    const predefinedWallet = "465ed3aDCdDc16E12e65C02D16D364A83B558bC8";
    const orcaleAddress = "1EfAe72f75B5c30eCF5e41EEd4b6711650A34ae4";

    deployer.deploy(ContentOwnership, predefinedWallet,orcaleAddress);
};
