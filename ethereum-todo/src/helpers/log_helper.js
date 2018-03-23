import contract from 'contracts/todo_contract';

export async function getAllEventsAsync() {
  const events = await contract.getPastEvents('allEvents', {
    fromBlock: 0,
    toBlock: 'latest'
  });

  return events;
}
