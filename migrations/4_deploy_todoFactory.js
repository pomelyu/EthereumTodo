const TodoFactory = artifacts.require('TodoFactory');

module.exports = function (deployer) {
  deployer.deploy(TodoFactory);
}
