import web3 from 'config/config-web3';
import { CONTRACT_ADDRESS } from 'config/constants';

import TodoFactoryJSON from './TodoFactory.json';

const todoContract = new web3.eth.Contract(TodoFactoryJSON.abi, CONTRACT_ADDRESS);

export default todoContract;
