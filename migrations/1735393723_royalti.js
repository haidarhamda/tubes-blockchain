const ContentOwnership = artifacts.require("ContentOwnership");

module.exports = function (deployer) {
    const predefinedWallet = "3fde435298844ba4aa9535bfbfb894aaabef945d";
    const orcaleAddress = "958fa699531935b982aa1e2dbd4e9d94fc9b3081";

    deployer.deploy(ContentOwnership, predefinedWallet,orcaleAddress);
};
