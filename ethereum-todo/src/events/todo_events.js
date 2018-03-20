import contract from '../contracts/todo_contract';

import store from '../store';
import * as todoHelper from '../helpers/todo_helper';
import { addTodo, deleteTodo, completeTodo } from '../duck/todo';

// Event
// contract.allEvents(defaultHandler('allEvent'));
const OnTodoAddedEvent = contract.OnTodoAdded();
OnTodoAddedEvent.watch(async (error, result) => {
  if (error) {
    console.log(error);
    return;
  }
  const { args } = result;
  const todoId = args.todoId.toNumber();
  const todo = await todoHelper.getTodoAsync(todoId);
  store.dispatch(addTodo(todoId, todo[0], todo[1]));
  console.log('Add', todoId);
});

const OnTodoDeletedEvent = contract.OnTodoDeleted();
OnTodoDeletedEvent.watch((error, result) => {
  if (error) {
    console.log(error);
    return;
  }
  const { args } = result;
  const todoId = args.todoId.toNumber();
  store.dispatch(deleteTodo(todoId));
  console.log('Delete', todoId);
});


const OnTodoCompletedEvent = contract.OnTodoCompleted();
OnTodoCompletedEvent.watch((error, result) => {
  if (error) {
    console.log(error);
    return;
  }
  const { args } = result;
  const todoId = args.todoId.toNumber();
  store.dispatch(completeTodo(todoId));
  console.log('Complete', todoId);
});
