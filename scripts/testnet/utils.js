const { keccak256, concat, toBeHex, AddressZero } = require("ethers");

const defaultAbiCoder = ethers.AbiCoder.defaultAbiCoder();

function encodeUserOp(userOp) {
  const packedUserOp = packUserOp(userOp);

  return defaultAbiCoder.encode(
    [
      "address",
      "uint256",
      "bytes32",
      "bytes32",
      "bytes32",
      "uint256",
      "bytes32",
      "bytes32",
    ],
    [
      packedUserOp.sender,
      packedUserOp.nonce,
      keccak256(packedUserOp.initCode),
      keccak256(packedUserOp.callData),
      packedUserOp.accountGasLimits,
      packedUserOp.preVerificationGas,
      packedUserOp.gasFees,
      keccak256(packedUserOp.paymasterAndData),
    ]
  );
}

function encodeUserOp2(userOp) {
  return concat([
    userOp.sender,
    userOp.nonce,
    userOp.factory,
    userOp.factoryData,
    userOp.callData,
    userOp.callGasLimit,
    userOp.verificationGasLimit,
    userOp.preVerificationGas,
    userOp.maxFeePerGas,
    userOp.maxPriorityFeePerGas,
    userOp.paymaster,
    userOp.paymasterVerificationGasLimit,
    userOp.paymasterPostOpGasLimit,
    userOp.paymasterData
  ]);
}

function getUserOpHash(op, entryPoint, chainId) {
  const userOpHash = keccak256(encodeUserOp2(op));
  const enc = defaultAbiCoder.encode(
    ["bytes32", "address", "uint256"],
    [userOpHash, entryPoint, chainId]
  );
  return keccak256(enc);
}

function packUserOp(userOp) {
  const accountGasLimits = packAccountGasLimits(
    userOp.verificationGasLimit,
    userOp.callGasLimit
  );
  const gasFees = packAccountGasLimits(
    userOp.maxPriorityFeePerGas,
    userOp.maxFeePerGas
  );
  let paymasterAndData = "0x";
  if (userOp.paymaster?.length >= 20 && userOp.paymaster !== AddressZero) {
    paymasterAndData = packPaymasterData(
      userOp.paymaster,
      userOp.paymasterVerificationGasLimit,
      userOp.paymasterPostOpGasLimit,
      userOp.paymasterData
    );
  }
  return {
    sender: userOp.sender,
    nonce: userOp.nonce,
    callData: userOp.callData,
    accountGasLimits,
    initCode: userOp.initCode,
    preVerificationGas: userOp.preVerificationGas,
    gasFees,
    paymasterAndData,
    signature: userOp.signature,
  };
}

function packAccountGasLimits(verificationGasLimit, callGasLimit) {
  return concat([toBeHex(verificationGasLimit, 16), toBeHex(callGasLimit, 16)]);
}

function packPaymasterData(
  paymaster,
  paymasterVerificationGasLimit,
  postOpGasLimit,
  paymasterData
) {
  return concat([
    paymaster,
    toBeHex(paymasterVerificationGasLimit, 16),
    toBeHex(postOpGasLimit, 16),
    paymasterData,
  ]);
}

module.exports = { getUserOpHash };
