const hre = require("hardhat");

const FACTORY_NONCE = 1;
const FACTORY_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ENTRY_POINT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const PAYMASTER_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

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

  const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");
  const [signer0] = await hre.ethers.getSigners();
  const address0 = await signer0.getAddress();
  const initCode =
    FACTORY_ADDRESS +
    AccountFactory.interface
      .encodeFunctionData("createAccount", [address0])
      .slice(2);

  // Pre-found Entry Point on behalf of the smart account (sender)
  await entryPoint.depositTo(PAYMASTER_ADDRESS, {
    value: hre.ethers.parseEther("0.5"),
  });

  const Account = await hre.ethers.getContractFactory("Account");
  const userOp = {
    sender, // smart account address
    nonce: await entryPoint.getNonce(sender, 0),
    initCode,
    callData: Account.interface.encodeFunctionData("execute"),
    accountGasLimits: encode(
      hre.ethers.parseUnits("200000", "wei"),
      hre.ethers.parseUnits("100000", "wei")
    ),
    preVerificationGas: hre.ethers.parseUnits("100000", "wei"),
    gasFees: encode(
      hre.ethers.parseUnits("100000", "wei"),
      hre.ethers.parseUnits("100000", "wei")
    ),
    paymasterAndData: createPaymasterAndData(
      PAYMASTER_ADDRESS,
      hre.ethers.parseUnits("100000", "wei"),
      hre.ethers.parseUnits("100000", "wei")
    ),
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

// Concatenate the input field into a 52-bytes string (104 hexadecimal characters)
function createPaymasterAndData(
  paymasterAddress,
  validationGasLimit,
  postOpGasLimit
) {
  const validationGasLimitBytes = hre.ethers.toBeHex(validationGasLimit, 16);
  const postOpGasLimitBytes = hre.ethers.toBeHex(postOpGasLimit, 16);

  // Concatenate the paymaster address and the two gas limits
  const paymasterAndData = hre.ethers.concat([
    paymasterAddress, // 20 bytes
    validationGasLimitBytes, // 16 bytes
    postOpGasLimitBytes, // 16 bytes
  ]);

  // Return the final paymasterAndData as a hex string
  return paymasterAndData;
}

// Concatenate the input numbers into a 32-byte string (64 hexadecimal characters)
function encode(gas1, gas2) {
  // Convert each input into a 16 bytes string (32 hexadecimal characters)
  const gas1Encoded = hre.ethers.toBeHex(gas1, 16);
  const gas2Encoded = hre.ethers.toBeHex(gas2, 16);
  // Concatenate the previous inputs and returns a 32-bytes string (64 hexadecimal characters)
  const packed = hre.ethers.concat([gas1Encoded, gas2Encoded]);
  return packed;
}
