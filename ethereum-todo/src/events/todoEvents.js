import todoContract from 'contracts/todoContract';
import * as todoHelper from 'helpers/todoHelpers';
import { addTodo, deleteTodo, completeTodo } from 'containers/App/duck/todo';

import store from '../store';

// Event
todoContract.events.OnTodoAdded({
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

todoContract.events.OnTodoDeleted({
}, (error, result) => {
  if (error) {
    console.log(error);
    return;
  }
  const { returnValues: { todoId } } = result;
  store.dispatch(deleteTodo(todoId));
  console.log('Delete', todoId);
});

todoContract.events.OnTodoCompleted({
}, (error, result) => {
  if (error) {
    console.log(error);
    return;
  }
  const { returnValues: { todoId } } = result;
  store.dispatch(completeTodo(todoId));
  console.log('Complete', todoId);
});
