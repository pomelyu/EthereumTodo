import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FlexBox from 'components/FlexBox';

import {
  getTodoList,
  deleteTodoTransaction,
  completeTodoTransaction,
} from './duck/todo';
import { todoSelector } from './selectors';
import Todo from './Todo';

class TodoList extends React.Component {
  componentDidMount() {
    this.props.getTodoList();
  }

  render() {
    const { todos, deleteTodo, completeTodo } = this.props;
    return (
      <FlexBox direction="column">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
        />
      ))}
      </FlexBox>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.any),
  getTodoList: PropTypes.func,
  deleteTodo: PropTypes.func,
  completeTodo: PropTypes.func,
};

TodoList.defaultProps = {
  todos: [],
  getTodoList: () => {},
  deleteTodo: () => {},
  completeTodo: () => {},
};

const mapStateToProps = (state) => ({
  todos: todoSelector(state).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  getTodoList: () => dispatch(getTodoList()),
  deleteTodo: (todoId) => dispatch(deleteTodoTransaction(todoId)),
  completeTodo: (todoId) => dispatch(completeTodoTransaction(todoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
