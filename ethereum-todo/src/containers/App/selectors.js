import { createSelector } from 'reselect';

const stateSelector = (state) => state.getIn(['transaction', 'state']);
const todoSelector = (state) => state.getIn(['todo', 'todos']);

const inCompletedCountSelector = createSelector(
  todoSelector,
  todos => todos.filter((todo) => (!todo.get('isCompleted'))).size,
);

export {
  stateSelector,
  todoSelector,
  inCompletedCountSelector,
};
