# 在區塊鏈上實作 Todo App

### 詳細教學
- Truffle 的[教學部分](./tutorial/1-truffle.md)
- Web3 的[教學部分](./tutorial/2-web3.md)

### 快速啟動
```bash
# install truffle
npm install -g truffle@4.1.3

# run development blockchain
ganache-cli --seed apple banana cherry
## 結果
# Available Accounts
# ==================
# (0) 0x1d489c3f8ed5ee71325a847888b2157c9ac29c05
#
# record the first user account 0x1d489c3f8ed5ee71325a847888b2157c9ac29c05

# compile contract
truffle compile

# test contract
truffle test

# migrate contract
truffle migrate
## 結果
# Running migration: 4_deploy_todoFactory.js
#   Deploying TodoFactory...
#   ... 0xfecf0206d68c496cf067e320a4d4b5d294dfe89979552f7b6b8ab38696c51356
#   TodoFactory: 0x21e4624c5a0b3fda81d0833d412dded2bb3a7a7c
# Saving successful migration to network...
#   ... 0x6f592087ebfa7d5d77cce3f82c9d1222148c25499c348a59480ccfb3fe5884e1
# Saving artifacts...

# record the deployed address 0x21e4624c5a0b3fda81d0833d412dded2bb3a7a7c

# modify CONTRACT_ADDRESS and DEFAULT_USER in ethereum-todo/src/config/contants.js

cd ethereum-todo
yarn install
yarn start
```
