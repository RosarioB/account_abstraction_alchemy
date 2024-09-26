# account_abstraction_alchemy

- Code based on the Alchemy playlist https://www.youtube.com/playlist?list=PLMj8NvODurfF5xy8CO59TNNeC-RTtCCf8
- EIP 4337: https://eips.ethereum.org/EIPS/eip-4337
- Alchemy Documentation: https://docs.alchemy.com/docs/smart-accounts-from-scratch

***Banches***:
- ***execute_user_op***: Execution of the first basic user operation, where the smart account covers the cost of the user operation. It is using user operation v7.
- ***build_paymaster***: Added the paymaster to the previous code. In this case the paymaster is covering the cost of the user operation. It is using user operation v7.
- ***account_validation***: Validation of the user operation signature. It is using user operation v7.
- ***alchemy_code***: Makes use of the bundler and of Alchemy API to execute the user operation on Arbitrum. It is using user operation v6.
- ***shipping_to_testnet***: Tried to make use of the Alchemy bundler like in the branch `alchemy_code`  to execute the user operation on Arbitrum for user operation v7 but right now is not working.

