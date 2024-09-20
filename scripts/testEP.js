const hre = require("hardhat");
const { expect } = require("chai");

const ENTRY_POINT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

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