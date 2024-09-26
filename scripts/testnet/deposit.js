const hre = require("hardhat");

const ENTRY_POINT_ADDRESS = "0x0000000071727De22E5E9d8BAf0edAc6f37da032";
const PAYMASTER_ADDRESS = "0xbb7101e96a16B2f1DbD1A3A89Dbd42A06a772a6D";

async function main() {
  const entryPoint = await hre.ethers.getContractAt(
    "EntryPoint",
    ENTRY_POINT_ADDRESS
  );

  // Pre-found Entry Point on behalf of the smart account (sender)
  await entryPoint.depositTo(PAYMASTER_ADDRESS, {
    value: hre.ethers.parseEther("0.2"),
  });

  console.log("Deposit was successful");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
