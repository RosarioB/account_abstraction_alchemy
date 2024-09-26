const hre = require("hardhat");

const ENTRY_POINT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const PAYMASTER_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
  const entryPoint = await hre.ethers.getContractAt(
    "EntryPoint",
    ENTRY_POINT_ADDRESS
  );

  // Pre-found Entry Point on behalf of the smart account (sender)
  await entryPoint.depositTo(PAYMASTER_ADDRESS, {
    value: hre.ethers.parseEther("0.1"),
  });

  console.log("Deposit was successful");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
