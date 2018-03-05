// modified from https://github.com/meteor/simple-todos.git
import React from 'react';
import PropTypes from 'prop-types';

import Todo from './Todo.jsx';

// App component - represents the whole app
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.textOnChange = this.textOnChange.bind(this);
    this.renderTodos = this.renderTodos.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { text } = this.state;
    this.props.addTodo(text);
    this.setState({ text: '' });
  }

  textOnChange(event) {
    const text = event.target.value;
    this.setState({ text });
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
    const { incompleteCount } = this.props;
    const { text } = this.state;
    return (
      <div className="container">
        <header>
          <h1>Todo List ({incompleteCount})</h1>
          <form className="new-task" onSubmit={this.handleSubmit} >
            <input
              type="text"
              value={text}
              onChange={this.textOnChange}
              placeholder="Type to add new tasks"
            />
          </form>
        </header>

        <ul>
          {this.renderTodos()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.any),
  incompleteCount: PropTypes.number,
  addTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  completeTodo: PropTypes.func,
};

App.defaultProps = {
  todos: [],
  incompleteCount: 0,
  addTodo: () => {},
  deleteTodo: () => {},
  completeTodo: () => {},
};

export default App;
