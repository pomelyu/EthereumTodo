import web3 from 'config/config-web3';

export async function getBalanceAsync(address) {
  const balance = await web3.eth.getBalance(address);
  return balance;
}
