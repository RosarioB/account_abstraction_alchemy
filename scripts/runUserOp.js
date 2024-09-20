const hre = require("hardhat");

const FACTORY_NONCE = 1;
const FACTORY_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const ENTRY_POINT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

async function main() {
  const entryPoint = await hre.ethers.getContractAt(
    "EntryPoint",
    ENTRY_POINT_ADDRESS
  );

  const sender = await hre.ethers.getCreateAddress({
    from: FACTORY_ADDRESS,
    nonce: FACTORY_NONCE,
  });

  console.log("Sender address " + sender);

  const balanceEP = await entryPoint.balanceOf(sender);
  console.log("Balance entry point " +  balanceEP);

  const [signer0] = await hre.ethers.getSigners();
  const address0 = await signer0.getAddress();
  const initCode = "0x";

  const Account = await hre.ethers.getContractFactory("Account");
  const userOp = {
    sender, // smart account address
    nonce: await entryPoint.getNonce(sender, 0),
    initCode,
    callData: Account.interface.encodeFunctionData("execute"),
    accountGasLimits: packGases(200_000, 200_000),
    preVerificationGas: 50_000,
    gasFees: packGases(
      hre.ethers.parseUnits("10", "gwei"),
      hre.ethers.parseUnits("10", "gwei")
    ),
    paymasterAndData: "0x",
    signature: "0x",
  };

  const tx = await entryPoint.handleOps([userOp], address0);
  const receipt = await tx.wait();
  console.log(receipt);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

function packGases(gas1, gas2) {
  // Convert both values to BigInt (128-bit integers)
  const gas1BN = BigInt(gas1);
  const gas2BN = BigInt(gas2);

  // Shift gas1 left by 128 bits
  const packedHigh = gas1BN << BigInt(128);

  // Combine the high and low parts using bitwise OR
  const packed = packedHigh | gas2BN;

  // Convert the packed value to a hex string and pad to 64 hex characters (32 bytes)
  let packedHex = packed.toString(16).padStart(64, "0");

  return `0x${packedHex}`;
}
