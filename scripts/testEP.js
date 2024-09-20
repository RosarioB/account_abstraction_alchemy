const hre = require("hardhat");
const { expect } = require("chai");

const ENTRY_POINT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"

async function main() {
  const code = await hre.ethers.provider.getCode(ENTRY_POINT_ADDRESS);
  expect(code.replace("0x", "").length).to.be.greaterThan(0);
  
  const balance = await hre.ethers.provider.getBalance(ENTRY_POINT_ADDRESS);
  expect(balance).to.equal(0) ;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});