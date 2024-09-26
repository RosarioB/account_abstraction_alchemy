const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Testnet", (m) => {
  const af = m.contract("AccountFactory");
  const pm = m.contract("Paymaster");

  return { af, pm };
});
