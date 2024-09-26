const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Local", (m) => {
  const ep = m.contract("EntryPoint");
  const af = m.contract("AccountFactory");
  const pm = m.contract("Paymaster");

  return { ep, af, pm };
});
