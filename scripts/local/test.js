const hre = require("hardhat");

const ACCOUNT_ADDRESS = "0x42215745d8e4ebdb193548e257dffcae5942645e"; // sender address

async function main() {
  const account = await hre.ethers.getContractAt("Account", ACCOUNT_ADDRESS);

  const count = await account.count();
  console.log("Count is " + count);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
