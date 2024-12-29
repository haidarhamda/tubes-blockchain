const Oracle = artifacts.require("Oracle");

module.exports = function(deployer) {
  const _oracle="1EfAe72f75B5c30eCF5e41EEd4b6711650A34ae4";

  deployer.deploy(Oracle, _oracle);
};
