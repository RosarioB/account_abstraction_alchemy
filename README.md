# Build a paymaster
- [Link to the video](https://www.youtube.com/watch?v=2LGpEobxIBA&list=PLMj8NvODurfF5xy8CO59TNNeC-RTtCCf8&index=2)
- [Link to the documentation](https://docs.alchemy.com/docs/2-build-a-paymaster)

In this branch we add the paymaster that will pay the user operation. 

## Execution 
We firstly 
First start the local Hardhat blockchain with:

`npx hardhat node`

Then we deploy the EntryPoint and the Account Factory with:

`npx hardhat ignition deploy ignition/modules/Module.js`

Remember to update the variables `ENTRY_POINT_ADDRESS`, `FACTORY_ADDRESS` and `PAYMASTER_ADDRESS` with the values returned by the ignition module.

Than create the smart account (address sender) and run the first user operation by executing:

`npx hardhat run scripts/createSmartAccount.js`

Then test the execution of the user operation by executing (count should be 1):

`npx hardhat run scripts/testSmartAccount.js` remember to update the `ACCOUNT_ADDRESS` with the output of the previous run in `Sender address`.

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