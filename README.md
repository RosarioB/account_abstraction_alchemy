# Smart Accounts Hardhat Project

This is the code built in the "Account Abstraction From Scratch Course" by Alchemy:

- Part 1: https://youtu.be/NM04uxcCOEw
- Part 2: https://youtu.be/2LGpEobxIBA
- Part 3: https://youtu.be/vj2gklqLRSA
- Part 4: https://youtu.be/AY4jI0GXKBc

In this part we test directly the Account Abstraction in the Arbitrum Sepolia test network. This code uses user operation v6, while in the other branches we use user operation v7

## Execution

1.  Deploy the contracts

`npx hardhat run scripts/deploy.js`

2. Update `PM_ADDRESS` and `AF_ADDRESS` in the scripts `deploy.js` and `execute.js`.

3. Deposit `0.2` ETH into the paymaster running  

`npx hardhat run scripts/deposit.js`

4. Run the script to execute the user operation:

`npx hardhat run scripts/execute.js`

5. In the `test.js` file replace `ACCOUNT_ADDR` with the `sender` address printed in the console after executing the script `execute.js`

5. Run the script to test the user operation:

`npx hardhat run scripts/test.js`

You can execute the user operation multiple times and the counter in the `test.js` file should increase