import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FlexBox from 'components/FlexBox';

const Sheet = FlexBox.extend.attrs({
  direction: 'row',
  space: '10px',
})`
  padding: 15px;
  border-bottom: #eee solid 1px;
  align-items: center;

  > span {
    line-height: 14px;
    text-decoration: ${props => (props.isCompleted ? 'line-through' : 'none')};
    margin-right: auto;
  }
`;

const SymbolButton = styled.button`
  font-weight: bold;
  background: none;
  font-size: 1em;
  border: none;
  cursor: pointer;
  align-self: flex-end;
`;

const Todo = ({ todo, deleteTodo, completeTodo }) => {
  const { id, taskName, isCompleted } = todo;

  const handleDeleted = () => {
    deleteTodo(id);
  }

  const handleCompeted = () => {
    if (isCompleted) return;
    completeTodo(id);
  }

  return (
    <Sheet isCompleted={isCompleted}>
      <input
        type="checkbox"
        readOnly
        checked={isCompleted}
        onClick={handleCompeted}
      />

      <span>
        {`(${id})`} <strong>User</strong>: {taskName}
      </span>

      <SymbolButton onClick={handleDeleted}>
        &times;
      </SymbolButton>
    </Sheet>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    taskName: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }),
  completeTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default Todo;
