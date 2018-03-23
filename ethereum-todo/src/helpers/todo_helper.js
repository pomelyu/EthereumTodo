import { DEFAULT_USER } from 'config/constants';
import contract from 'contracts/todo_contract';

// Method
export async function getTodoListAsync() {
  const gas = await contract.methods.getTodoList().estimateGas();
  console.log('Get TodoList: Estimated gas', gas);
  const result = await contract.methods.getTodoList().call({
    from: DEFAULT_USER,
    gas:200000,
  });
  return result;
}

export async function getTodoAsync(todoId) {
  const gas = await contract.methods.getTodo(todoId).estimateGas();
  console.log('Get Todo: Estimated gas', gas);
  const result = await contract.methods.getTodo(todoId).call({
    from: DEFAULT_USER,
    gas:200000,
  });
  return result;
}

export async function addTodoAsync(taskName) {
  const gas = await contract.methods.addTodo(taskName).estimateGas();
  console.log('AddTodo: Estimated gas', gas);
  await contract.methods.addTodo(taskName).send({
    from: DEFAULT_USER,
    gas: 200000,
  });
}

export async function deleteTodoAsync(todoId) {
  const gas = await contract.methods.deleteTodo(todoId).estimateGas();
  console.log('DeleteTodo: Estimated gas', gas);
  await contract.methods.deleteTodo(todoId).send({
    from: DEFAULT_USER,
    gas: 200000,
  });
}

export async function completeTodoAsync(todoId) {
  const gas = await contract.methods.completeTodo(todoId).estimateGas();
  console.log('CompleteTodo: Estimated gas', gas);
  await contract.methods.completeTodo(todoId).send({
    from: DEFAULT_USER,
    gas: 200000,
  });
}
