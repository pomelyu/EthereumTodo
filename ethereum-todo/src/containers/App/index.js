import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button } from 'antd';
import _ from 'lodash';

import FlexBox from 'components/FlexBox';
import Header from 'components/Header';
import H1 from 'components/H1';

import { showLogs } from './duck/logs';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import LogsModal from './LogsModal';

const Base = styled.div`
  max-width: 600px;
  margin: 0 auto;
  min-height: 100%;
  background: white;
`;

// App component - represents the whole app
const App = ({ transactionState, incompleteCount, showLogs }) => (
  <Base>
    <Header>
      <FlexBox direction="row" space="10px">
        <H1>Todo List ({incompleteCount}) {transactionState}</H1>
        <Button type="primary" onClick={showLogs}>Logs</Button>
      </FlexBox>
      <TodoInput submitOnClick={this.handleTodoSubmit} />
    </Header>

    <TodoList />
    <LogsModal />
  </Base>
);

App.propTypes = {
  transactionState: PropTypes.string,
  incompleteCount: PropTypes.number,
  showLogs: PropTypes.func,
};

App.defaultProps = {
  transactionState: '',
  incompleteCount: 0,
  showLogs: () => {},
};

const mapStateToProps = (state) => {
  const transactionState = state.getIn(['transaction', 'state']);
  const todos = state.getIn(['todo', 'todos']).toJS();
  const incompleteCount = _.filter(todos, { isCompleted: false }).length;
  return {
    transactionState,
    incompleteCount,
  };
}

const mapDispatchToProps = (dispatch) => ({
  showLogs: () => dispatch(showLogs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
