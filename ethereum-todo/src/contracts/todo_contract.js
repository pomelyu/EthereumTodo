import web3 from '../config/web3_config';
import TodoFactoryJSON from '../contracts/TodoFactory.json';

const contract = web3.eth.contract(TodoFactoryJSON.abi).at('0x2a4da3c423e8c82cf4f1a04b3dcb5fcdcc7c9774');

const balance = web3.eth.getBalance('0x1d489c3f8ed5ee71325a847888b2157c9ac29c05');
console.log('balance of account0', balance.toNumber());

export default contract;
