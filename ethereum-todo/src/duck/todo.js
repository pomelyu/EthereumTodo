import Immutable from 'immutable';
import * as todoHelper from '../helpers/todo_helper';

import { transactionPending, transactionError, transactionFinished } from './transaction';

const ADD_TODO = 'todo/ADD_TODO';
const DELETE_TODO = 'todo/DELETE_TODO';
const COMPLETE_TODO = 'todo/COMPLETE_TODO';
const SET_LIST = 'todo/SET_LIST';

const TodoState = Immutable.fromJS({
  todos: [],
});

const setTodoList = (todos) => ({
  type: SET_LIST,
  payload: { todos },
});

export const getTodoList = () => (dispatch) => {
  dispatch(transactionPending());
  todoHelper.getTodoList((error, result) => {
    if (error) {
      dispatch(transactionError(error));
      return;
    }
    dispatch(transactionFinished());
    const ids = result[0];
    const isCompletes = result[1];
    const todos = ids.map((id, idx) => ({
      taskName: 'Default',
      id: id.toNumber(),
      isCompleted: isCompletes[idx],
    }));
    dispatch(setTodoList(todos));
  });
};

export const addTodoTransaction = (taskName) => (dispatch) => {
  dispatch(transactionPending());
  todoHelper.addTodo(taskName, (error, result) => {
    if (error) {
      dispatch(transactionError(error));
      return;
    }
    dispatch(transactionFinished());
  });
};

export const deleteTodoTransaction = (todoId) => (dispatch) => {
  dispatch(transactionPending());
  todoHelper.deleteTodo(todoId, (error, result) => {
    if (error) {
      dispatch(transactionError(error));
      return;
    }
    dispatch(transactionFinished());
  });
};

export const completeTodoTransaction = (todoId) => (dispatch) => {
  dispatch(transactionPending());
  todoHelper.completeTodo(todoId, (error, result) => {
    if (error) {
      dispatch(transactionError(error));
      return;
    }
    dispatch(transactionFinished());
  });
};

export const addTodo = (todoId) => ({
  type: ADD_TODO,
  payload: { todoId },
});

// export const deleteTodo = (todoId) => ({
//   type: DELETE_TODO,
//   payload: { todoId },
// });
export const deleteTodo = (todoId) => ({
  type: DELETE_TODO,
  payload: { todoId },
});

export const completeTodo = (todoId) => ({
  type: COMPLETE_TODO,
  payload: { todoId },
});

const reducer = (state = TodoState, action) => {
  switch (action.type) {
    case SET_LIST:
      return state.set('todos', Immutable.fromJS(action.payload.todos));
    case ADD_TODO:
      return handleAddTodo(state, action.payload);
    case DELETE_TODO:
      return handleDeleteTodo(state, action.payload);
    case COMPLETE_TODO:
      return handleCompleteTodo(state, action.payload);
    default:
      return state;
  }
}

const handleAddTodo = (state, payload) => {
  const { todoId } = payload;
  const index = state.get('todos').findIndex(v => (v.get('id') === todoId));
  if (index >= 0) return state;
  
  const todo = Immutable.fromJS({
    taskName: 'Default',
    id: todoId,
    isCompleted: false,
  });
  return state.set('todos', state.get('todos').push(todo));
};

const handleDeleteTodo = (state, payload) => {
  const { todoId } = payload;
  const index = state.get('todos').findIndex(v => (v.get('id') === todoId));
  return state.set('todos', state.get('todos').delete(index));
};

const handleCompleteTodo = (state, payload) => {
  const { todoId } = payload;
  const index = state.get('todos').findIndex(v => (v.get('id') === todoId));
  return state.setIn(['todos', index, 'isCompleted'], true);
}

export default reducer;
