# Execute a User Operation
In this branch we execute a basic user operation where it is the Smart Account that it is sponsoring the cost of the user operation. We firstly 
First start the local Hardhat blockchain with:

`npx hardhat node`

Then we deploy the EntryPoint and the Account Factory with:

`npx hardhat ignition deploy ignition/modules/Module.js`

Then we test tha the deployment of the Entry Point was successful by executing 

`npx hardhat run scripts/testEP.js`

Remember to update the variables `ENTRY_POINT_ADDRESS` and `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512` with the values returned by the ignition module.

Than create the smart account (address sender) and run the first user operation by executing:

`npx hardhat run scripts/createSmartAccount.js`

Then test the execution of the user operation by executing (count should be 1):

`npx hardhat run scripts/testSmartAccount.js` remember to update the `ACCOUNT_ADDRESS` (i.e. the smart account) with the output of the previous run in `Sender address`.

Then to run subsequent user operations run:

`npx hardhat run scripts/runUserOp.js`

Finally if you want to test the the user operation run again: 

`npx hardhat run scripts/testSmartAccount.js`

The count should increasing and should be equal to the number of user operations you have executed.


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