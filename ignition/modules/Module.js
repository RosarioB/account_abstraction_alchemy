const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Module", (m) => {
  const ep = m.contract("EntryPoint");
  const af = m.contract("AccountFactory");

  return { af, ep };
});
