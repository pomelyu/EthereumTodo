import contract from '../contracts/todo_contract';

import store from '../store';
import * as todoHelper from '../helpers/todo_helper';
import { addTodo, deleteTodo, completeTodo } from '../duck/todo';

// Event
contract.events.OnTodoAdded({
}, async (error, result) => {
  if (error) {
    console.log(error);
    return;
  }
  const { returnValues: { todoId } } = result;
  const todo = await todoHelper.getTodoAsync(todoId);
  store.dispatch(addTodo(todoId, todo[0], todo[1]));
  console.log('Add', todoId);
});

contract.events.OnTodoDeleted({
}, (error, result) => {
  if (error) {
    console.log(error);
    return;
  }
  const { returnValues: { todoId } } = result;
  store.dispatch(deleteTodo(todoId));
  console.log('Delete', todoId);
});

contract.events.OnTodoCompleted({
}, (error, result) => {
  if (error) {
    console.log(error);
    return;
  }
  const { returnValues: { todoId } } = result;
  store.dispatch(completeTodo(todoId));
  console.log('Complete', todoId);
});
