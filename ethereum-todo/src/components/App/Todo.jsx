import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Task = ({ todo, deleteTodo, completeTodo }) => {
  const { id, taskName, isCompleted } = todo;

  const handleDeleted = () => {
    deleteTodo(id);
  }

  const handleCompeted = () => {
    if (isCompleted) return;
    completeTodo(id);
  }

  const taskClassName = classnames({
    checked: isCompleted,
  });

  return (
    <li className={taskClassName}>
      <button className="delete" onClick={handleDeleted}>
        &times;
      </button>

      <input
        type="checkbox"
        readOnly
        checked={isCompleted}
        onClick={handleCompeted}
      />

      <span className="text">
        <strong>Default</strong>: {taskName}
      </span>
    </li>
  );
}

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    taskName: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }),
  completeTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default Task;
