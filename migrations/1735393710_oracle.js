const Oracle = artifacts.require("Oracle");

module.exports = function(deployer) {
  const _oracle="958fa699531935b982aa1e2dbd4e9d94fc9b3081";

  deployer.deploy(Oracle, _oracle);
};
