const hre = require("hardhat");

const ACCOUNT_ADDR = "0x82cc167a9f6f467fd0587465a04bdf01a9919fa9";

async function main() {
  const account = await hre.ethers.getContractAt("Account", ACCOUNT_ADDR);
  const count = await account.count();
  console.log(count);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
