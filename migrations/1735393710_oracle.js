const Oracle = artifacts.require("Oracle");

module.exports = function(deployer) {
  const _oracle="343931481aa12105128ddf43310cfbeaaa79c697";

  deployer.deploy(Oracle, _oracle);
};
