import todoContract from 'contracts/todoContract';

export async function getAllEventsAsync() {
  const events = await todoContract.getPastEvents('allEvents', {
    fromBlock: 0,
    toBlock: 'latest'
  });

  return events;
}
