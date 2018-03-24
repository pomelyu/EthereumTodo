import { DEFAULT_USER } from 'config/constants';
import todoContract from 'contracts/todoContract';

import { getBalanceAsync } from 'helpers/accountsHelpers';

void async function() {
  const balance = await getBalanceAsync(DEFAULT_USER);
  console.log('Balance of account0', balance);
}()

// Method
export async function getTodoListAsync() {
  const gas = await todoContract.methods.getTodoList().estimateGas();
  console.log('Get TodoList: Estimated gas', gas);
  const result = await todoContract.methods.getTodoList().call({
    from: DEFAULT_USER,
    gas:200000,
  });
  return result;
}

export async function getTodoAsync(todoId) {
  const gas = await todoContract.methods.getTodo(todoId).estimateGas();
  console.log('Get Todo: Estimated gas', gas);
  const result = await todoContract.methods.getTodo(todoId).call({
    from: DEFAULT_USER,
    gas:200000,
  });
  return result;
}

export async function addTodoAsync(taskName) {
  const gas = await todoContract.methods.addTodo(taskName).estimateGas();
  console.log('AddTodo: Estimated gas', gas);
  await todoContract.methods.addTodo(taskName).send({
    from: DEFAULT_USER,
    gas: 200000,
  });
}

export async function deleteTodoAsync(todoId) {
  const gas = await todoContract.methods.deleteTodo(todoId).estimateGas();
  console.log('DeleteTodo: Estimated gas', gas);
  await todoContract.methods.deleteTodo(todoId).send({
    from: DEFAULT_USER,
    gas: 200000,
  });
}

export async function completeTodoAsync(todoId) {
  const gas = await todoContract.methods.completeTodo(todoId).estimateGas();
  console.log('CompleteTodo: Estimated gas', gas);
  await todoContract.methods.completeTodo(todoId).send({
    from: DEFAULT_USER,
    gas: 200000,
  });
}
