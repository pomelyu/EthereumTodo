import Immutable from 'immutable';
import * as todoHelpers from 'helpers/todoHelpers';

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

export const getTodoList = () => async (dispatch) => {
  dispatch(transactionPending());
  const todos = [];
  try {
    const result = await todoHelpers.getTodoListAsync();
    const ids = result[0];
    for (let idx = 0 ; idx < ids.length ; idx++) {
      const todoId = ids[idx];
      const todo = await todoHelpers.getTodoAsync(todoId);
      todos.push({
        taskName: todo[0],
        id: todoId,
        isCompleted: todo[1],
      })
    }
    dispatch(setTodoList(todos));
    dispatch(transactionFinished());
  } catch (error) {
    dispatch(transactionError(error));
  }
};

export const addTodoTransaction = (taskName) => async (dispatch) => {
  dispatch(transactionPending());
  try {
    await todoHelpers.addTodoAsync(taskName);
    dispatch(transactionFinished());
  } catch (error) {
    dispatch(transactionError(error));
  }
};

export const deleteTodoTransaction = (todoId) => (dispatch) => {
  dispatch(transactionPending());
  todoHelpers.deleteTodoAsync(todoId, (error, result) => {
    if (error) {
      dispatch(transactionError(error));
      return;
    }
    dispatch(transactionFinished());
  });
};

export const completeTodoTransaction = (todoId) => (dispatch) => {
  dispatch(transactionPending());
  todoHelpers.completeTodoAsync(todoId, (error, result) => {
    if (error) {
      dispatch(transactionError(error));
      return;
    }
    dispatch(transactionFinished());
  });
};

export const addTodo = (todoId, taskName, isCompleted) => ({
  type: ADD_TODO,
  payload: { todoId, taskName, isCompleted },
});

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
  const { todoId, taskName, isCompleted } = payload;
  const index = state.get('todos').findIndex(v => (v.get('id') === todoId));
  if (index >= 0) return state;
  
  const todo = Immutable.fromJS({
    taskName,
    id: todoId,
    isCompleted,
  });
  return state.set('todos', state.get('todos').push(todo));
};

const handleDeleteTodo = (state, payload) => {
  const { todoId } = payload;
  const index = state.get('todos').findIndex(v => (v.get('id') === todoId));
  if (index < 0) return state;

  return state.set('todos', state.get('todos').delete(index));
};

const handleCompleteTodo = (state, payload) => {
  const { todoId } = payload;
  const index = state.get('todos').findIndex(v => (v.get('id') === todoId));
  if (index < 0) return state;

  return state.setIn(['todos', index, 'isCompleted'], true);
}

export default reducer;
