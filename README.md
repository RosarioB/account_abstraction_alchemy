# Account validation
The code is taken from the video https://www.youtube.com/watch?v=2LGpEobxIBA&list=PLMj8NvODurfF5xy8CO59TNNeC-RTtCCf8&index=2.

In this branch validate the user operation signature.

Before arriving to the final code of this branch some tests have been made with the contract Test and the script sig.js. In particular in `sig.js` we signed the message `wee` with the first Hardhat account (`0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266`) and then proved that the `Test` contract was able to retrieve the same address that signed the message `wee` in the script. Having proved this successfully we then move to signing the whole `userOp` because signing only the `wee` message was unsafe.
To reapeat this test you just need to run the `sig.js` file and verify that the `Test` contract console log the same address `0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266`.

## Execution
 We firstly 
First start the local Hardhat blockchain with:

`npx hardhat node`

Then we deploy the EntryPoint and the Account Factory with:

`npx hardhat ignition deploy ignition/modules/Module.js`

Remember to update the variables `ENTRY_POINT_ADDRESS`, `FACTORY_ADDRESS` and `PAYMASTER_ADDRESS` with the values returned by the ignition module.

There are two example of validating the user operation signature.


Than create the smart account (address sender) and run the first user operation by executing:

`npx hardhat run scripts/createSmartAccount.js`

Then test the execution of the user operation by executing (count should be 1):

`npx hardhat run scripts/test.js` remember to update the `ACCOUNT_ADDRESS` with the output of the previous run in `Sender address`.

Then to run subsequent user operations run:

`npx hardhat run scripts/runUserOp.js`

Finally if you want to test the the user operation run again: 

`npx hardhat run scripts/test.js`

The count should increase and be equal to the number of user operations you have executed. Additionally, the balance of the smart account should be zero, as well as the balance of the smart account on the entry point. Only the balance of the paymaster on the entry point should be approximately 0.5 Ether, and it should decrease with each run since the paymaster is covering the cost of the user operations.




# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```


# Source Code
This code is taken from the video [Build and Execute User Operations in Solidity | Account Abstraction From Scratch Course | Part 1](https://www.youtube.com/watch?v=NM04uxcCOEw&list=PLMj8NvODurfF5xy8CO59TNNeC-RTtCCf8) by Alchemy.