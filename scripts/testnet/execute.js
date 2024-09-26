const hre = require("hardhat");
const { getUserOpHash } = require('./utils');

const FACTORY_ADDRESS = "0x0f139EA10abd524cce32bDf522474a3FBd52ac75";
const ENTRY_POINT_ADDRESS = "0x0000000071727De22E5E9d8BAf0edAc6f37da032";
const PAYMASTER_ADDRESS = "0xbb7101e96a16B2f1DbD1A3A89Dbd42A06a772a6D";

async function main() {
  const entryPoint = await hre.ethers.getContractAt(
    "EntryPoint",
    ENTRY_POINT_ADDRESS
  );

  const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");
  const [signer0] = await hre.ethers.getSigners();
  const address0 = await signer0.getAddress();
  let initCode =
    FACTORY_ADDRESS +
    AccountFactory.interface
      .encodeFunctionData("createAccount", [address0])
      .slice(2);

  let sender;
  try {
    await entryPoint.getSenderAddress(initCode);
  } catch (ex) {
    sender = "0x" + ex.data.slice(-40);
  }

  const code = await ethers.provider.getCode(sender);

  if (code !== "0x") {
    initCode = "0x";
  }

  console.log({ sender });

  const Account = await hre.ethers.getContractFactory("Account");
  const userOpGasEstimation = {
    sender, // smart account address
    nonce: "0x" + (await entryPoint.getNonce(sender, 0)).toString(16), //"0x" + (await entryPoint.getNonce(sender, 0)).toString(16),
    factory: FACTORY_ADDRESS,
    factoryData: AccountFactory.interface.encodeFunctionData("createAccount", [
      address0,
    ]),
    callData: Account.interface.encodeFunctionData("execute"),
    paymaster: PAYMASTER_ADDRESS,
    signature:
      "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c",
  };

  const {
    preVerificationGas, // 0xe0a59
    callGasLimit,
    verificationGasLimit, // 0x63ede
    paymasterVerificationGasLimit,
  } = await ethers.provider.send("eth_estimateUserOperationGas", [
    userOpGasEstimation,
    ENTRY_POINT_ADDRESS,
  ]);

  const { maxFeePerGas } = await ethers.provider.getFeeData();
  const maxPriorityFeePerGas = await ethers.provider.send(
    "rundler_maxPriorityFeePerGas"
  );

  const userOpPerGetUserOpHash = {
    sender,
    nonce: hre.ethers.toBeHex("0x" + (await entryPoint.getNonce(sender, 0)).toString(16)),
    initCode,
    callData: Account.interface.encodeFunctionData("execute"),
    accountGasLimits: encode(
      hre.ethers.parseUnits("400000", "wei"),
      hre.ethers.parseUnits("400000", "wei")
    ),
    preVerificationGas: hre.ethers.toBeHex(preVerificationGas),
    gasFees: hre.ethers.concat([
      hre.ethers.toBeHex(maxPriorityFeePerGas, 16),
      hre.ethers.toBeHex(maxFeePerGas, 16),
    ]),
    paymasterAndData: hre.ethers.concat([
      PAYMASTER_ADDRESS,
      hre.ethers.toBeHex(paymasterVerificationGasLimit, 16),
      hre.ethers.toBeHex(100n, 16),
    ]),
    signature: "0x",
  };

  /* const userOp = {
    sender,
    nonce: userOpGasEstimation.nonce,
    factory: userOpGasEstimation.factory,
    factoryData: userOpGasEstimation.factoryData,
    callData: userOpGasEstimation.callData,
    paymaster: PAYMASTER_ADDRESS,
  };

   userOp.preVerificationGas = preVerificationGas;
  userOp.callGasLimit = callGasLimit;
  userOp.verificationGasLimit = verificationGasLimit;
  userOp.paymasterVerificationGasLimit = paymasterVerificationGasLimit;

  userOp.maxFeePerGas = hre.ethers.toBeHex(maxFeePerGas, 16); // hre.ethers.toBeHex(maxFeePerGas, 16) equal to "0x" + maxFeePerGas.toString(16);

  userOp.maxPriorityFeePerGas = maxPriorityFeePerGas; 

  const userOpHash = await entryPoint.getUserOpHash(userOpPerGetUserOpHash);

  userOp.signature = await signer0.signMessage(hre.ethers.getBytes(userOpHash)); */

  //TEST

  userOpPerGetUserOpHash.factory = userOpGasEstimation.factory;
  userOpPerGetUserOpHash.factoryData = userOpGasEstimation.factoryData;

  
  userOpPerGetUserOpHash.callGasLimit = callGasLimit;
  userOpPerGetUserOpHash.verificationGasLimit = hre.ethers.toBeHex(verificationGasLimit);
  
  userOpPerGetUserOpHash.paymaster = PAYMASTER_ADDRESS;
  userOpPerGetUserOpHash.paymasterVerificationGasLimit = hre.ethers.toBeHex(paymasterVerificationGasLimit); 
  userOpPerGetUserOpHash.paymasterPostOpGasLimit = hre.ethers.toBeHex(100n)
  userOpPerGetUserOpHash.paymasterData = "0x"   

  userOpPerGetUserOpHash.maxFeePerGas = hre.ethers.toBeHex(maxFeePerGas, 16); // hre.ethers.toBeHex(maxFeePerGas, 16) equal to "0x" + maxFeePerGas.toString(16);

  userOpPerGetUserOpHash.maxPriorityFeePerGas = hre.ethers.toBeHex(maxPriorityFeePerGas);







  delete userOpPerGetUserOpHash.initCode;

  delete userOpPerGetUserOpHash.paymasterAndData;
  delete userOpPerGetUserOpHash.accountGasLimits;
  delete userOpPerGetUserOpHash.gasFees;

  console.log(userOpPerGetUserOpHash)
  const userOpHash = getUserOpHash(userOpPerGetUserOpHash, ENTRY_POINT_ADDRESS, 421614);

  userOpPerGetUserOpHash.signature = await signer0.signMessage(
    hre.ethers.getBytes(userOpHash)
  );











 


  /* const userOpHash = await entryPoint.getUserOpHash(userOpPerGetUserOpHash);
  userOpPerGetUserOpHash.signature = await signer0.signMessage(
    hre.ethers.getBytes(userOpHash)
  ); */


  console.log("Paymaster verification gas limit " + paymasterVerificationGasLimit);

  console.log("User operation hash " + userOpHash);

  console.log("User operation signature " + userOpPerGetUserOpHash.signature);

  console.log(userOpPerGetUserOpHash);

  //delete userOpPerGetUserOpHash.initCode;

  console.log(userOpPerGetUserOpHash);

  const response = await ethers.provider.send("eth_sendUserOperation", [
    userOpPerGetUserOpHash,
    ENTRY_POINT_ADDRESS,
  ]);

  console.log(response);

  /* const response = await ethers.provider.send("eth_sendUserOperation", [
    userOp,
    ENTRY_POINT_ADDRESS,
  ]); */

  /* const tx = await entryPoint.handleOps([userOp], address0);
  const receipt = await tx.wait();
  console.log(receipt); */
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
