const hre = require("hardhat");

const ENTRY_POINT_ADDRESS = "0x0000000071727De22E5E9d8BAf0edAc6f37da032";
const PAYMASTER_ADDRESS = "0xbb7101e96a16B2f1DbD1A3A89Dbd42A06a772a6D";

async function main() {
  const ep = await hre.ethers.getContractAt("EntryPoint", ENTRY_POINT_ADDRESS);
  const pmBalance = await ep.balanceOf(PAYMASTER_ADDRESS)
  console.log("Paymaster balance on EP on behalf of PM is", hre.ethers.formatEther(pmBalance), "Ether");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
