// modified from https://github.com/meteor/simple-todos.git
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'antd';

import FlexBox from 'components/FlexBox';
import Header from 'components/Header';
import H1 from 'components/H1';

import TodoInput from './TodoInput';
import Todo from './Todo';
import LogsModal from './LogsModal';

const Base = styled.div`
  max-width: 600px;
  margin: 0 auto;
  min-height: 100%;
  background: white;
`;

// App component - represents the whole app
class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
    this.renderTodos = this.renderTodos.bind(this);
  }

  componentDidMount() {
    this.props.getTodoList();
  }

  handleTodoSubmit(text) {
    this.props.addTodo(text);
  }
  
  renderTodos() {
    const { todos, deleteTodo, completeTodo } = this.props;
    return todos.map((todo) => (
      <Todo
        key={todo.id}
        todo={todo}
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
      />
    ));
  }

  render() {
    const { transactionState, incompleteCount, showLogs } = this.props;
    return (
      <Base>
        <Header>
          <FlexBox direction="row" space="10px">
            <H1>Todo List ({incompleteCount}) {transactionState}</H1>
            <Button type="primary" onClick={showLogs}>Logs</Button>
          </FlexBox>
          <TodoInput submitOnClick={this.handleTodoSubmit} />
        </Header>

        <FlexBox direction="column">
          {this.renderTodos()}
        </FlexBox>
        <LogsModal />
      </Base>
    );
  }
}

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.any),
  transactionState: PropTypes.string,
  incompleteCount: PropTypes.number,
  getTodoList: PropTypes.func,
  addTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  completeTodo: PropTypes.func,
  showLogs: PropTypes.func,
};

App.defaultProps = {
  todos: [],
  transactionState: '',
  incompleteCount: 0,
  getTodoList: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
  completeTodo: () => {},
  showLogs: () => {},
};

export default App;
