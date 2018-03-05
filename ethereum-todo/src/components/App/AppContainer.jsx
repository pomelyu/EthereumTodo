import React from 'react';
import _ from 'lodash';

import App from './App.jsx';

const mockTodos = [{
  id: 0,
  taskName: 'Task1',
  isCompleted: false,
},{
  id: 1,
  taskName: 'Task2',
  isCompleted: true,
}];

const incompleteCount = _.filter(mockTodos, { isCompleted: false }).length;

const mockAddTodo = (taskName) => console.log('Add new todo:', taskName);
const mockDeleteTodo = (id) => console.log('Delete todo:', id);
const mockCompleteTodo = (id) => console.log('Complete todo:', id);

const AppContainer = () => (
  <App
    todos={mockTodos}
    incompleteCount={incompleteCount}
    addTodo={mockAddTodo}
    deleteTodo={mockDeleteTodo}
    completeTodo={mockCompleteTodo}
  />
)

export default AppContainer;
