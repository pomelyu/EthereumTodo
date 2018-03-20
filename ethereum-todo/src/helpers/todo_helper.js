import web3 from '../config/web3_config';
import contract from '../contracts/todo_contract';

// Method
export function getTodoList(callback) {
  contract.getTodoList({
    from: web3.eth.accounts[0],
    gas:200000,
  }, callback);
}

export function getTodoListAsync() {
  return new Promise((resolve, reject) => {
    getTodoList((error, result) => {
      if (error)
        reject(error);
      else
        resolve(result);
    });
  });
}

export function getTodo(todoId, callback) {
  contract.getTodo(todoId, {
    from: web3.eth.accounts[0],
    gas:200000,
  }, callback);
}

export function getTodoAsync(todoId) {
  return new Promise((resolve, reject) => {
    getTodo(todoId, (error, result) => {
      if (error)
        reject(error);
      else
        resolve(result);
    });
  });
}

export function addTodo(taskName, callback) {
  const gas = contract.addTodo.estimateGas(taskName);
  console.log('AddTodo: Estimated gas', gas);
  contract.addTodo(taskName, {
    from: web3.eth.accounts[0],
    gas:200000,
  }, callback);
}

export function deleteTodo(todoId, callback) {
  const gas = contract.deleteTodo.estimateGas(todoId);
  console.log('DeleteTodo: Estimated gas', gas);
  contract.deleteTodo(todoId, {
    from: web3.eth.accounts[0],
    gas:200000,
  }, callback);
}

export function completeTodo(todoId, callback) {
  const gas = contract.completeTodo.estimateGas(todoId);
  console.log('CompleteTodo: Estimated gas', gas);
  contract.completeTodo(todoId, {
    from: web3.eth.accounts[0],
    gas:200000,
  }, callback);
}



// web3 v1.0
// const contract = new web3.eth.Contract(TodoFactoryJSON.abi, '0x21e4624c5a0b3fda81d0833d412dded2bb3a7a7c')

// contract.events.OnTodoAdded({}, (err, event) => {
//   console.log(err);
//   console.log(event);
// });

// contract.methods.addTodo('Task1').call();
