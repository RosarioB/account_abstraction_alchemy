// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "hardhat/console.sol";

contract Test {
    constructor(bytes memory sig) {
        address recovered = ECDSA.recover(
            MessageHashUtils.toEthSignedMessageHash(keccak256("wee")),
            sig
        );
        console.log(recovered);
    }
}