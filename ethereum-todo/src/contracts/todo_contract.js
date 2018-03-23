import web3 from 'config/web3_config';
import { CONTRACT_ADDRESS, DEFAULT_USER } from 'config/constants';

import TodoFactoryJSON from './TodoFactory.json';

const contract = new web3.eth.Contract(TodoFactoryJSON.abi, CONTRACT_ADDRESS);

web3.eth.getBalance(DEFAULT_USER)
  .then(balance => {
    console.log('balance of account0', balance);
  });

export default contract;
