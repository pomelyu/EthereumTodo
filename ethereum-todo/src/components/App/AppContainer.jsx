import { connect } from 'react-redux';
import _ from 'lodash';

import App from './App.jsx';

import {
  getTodoList,
  addTodoTransaction,
  deleteTodoTransaction,
  completeTodoTransaction,
} from '../../duck/todo';

import { showLogs } from '../../duck/logs';

const mapStateToProps = (state) => {
  const transactionState = state.getIn(['transaction', 'state']);
  const todos = state.getIn(['todo', 'todos']).toJS();
  const incompleteCount = _.filter(todos, { isCompleted: false }).length;
  return {
    transactionState,
    todos,
    incompleteCount,
  };
}

const mapDispatchToProps = (dispatch) => ({
  getTodoList: () => dispatch(getTodoList()),
  addTodo: (taskName) => dispatch(addTodoTransaction(taskName)),
  deleteTodo: (todoId) => dispatch(deleteTodoTransaction(todoId)),
  completeTodo: (todoId) => dispatch(completeTodoTransaction(todoId)),
  showLogs: () => dispatch(showLogs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
