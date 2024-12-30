const ContentOwnership = artifacts.require("ContentOwnership");

module.exports = function (deployer) {
    const predefinedWallet = "81441f063a290b1f3252123029ba09139c80b3b0";
    // const orcaleAddress = "1EfAe72f75B5c30eCF5e41EEd4b6711650A34ae4";

    deployer.deploy(ContentOwnership, predefinedWallet);
};
