import Web3 from 'web3';

// const provider = new Web3.providers.HttpProvider('http://localhost:8545');
// const web3 = new Web3(provider);
const web3 = new Web3('ws://localhost:8545');

export default web3;
