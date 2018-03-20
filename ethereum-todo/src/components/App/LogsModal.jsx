import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Modal } from 'antd';

import { hideLogs } from '../../duck/logs';

const BaseBox = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin-top: 10px;
  }

  > *:first-child {
    margin-top: 0px;
  }
`;

const Sheet = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  > * {
    margin-left: 10px;
  }

  > *:first-child {
    margin-left: 0px;
  }
`;

const NumberText = styled.div`
  font-size: 16;
  border: 1px solid black;
  padding: 4px;
  background-color: lightgrey;
`;

const EventText = styled.div`
  font-size: 16px;
`;

const ArgsText = styled.div`
  font-size: 14;
`;

const LogsModal = ({ visible, logs, hideLogs }) => (
  <Modal
    title="Transaction Logs"
    visible={visible}
    onOk={hideLogs}
    onCancel={hideLogs}
  >
    <BaseBox>
      {logs.map(({ blockNumber, event, returnValues }) => (
        <Sheet key={blockNumber}>
          <NumberText>{`Block: ${String(blockNumber).padStart(3, '0')}`}</NumberText>
          <EventText>{event}</EventText>
          <ArgsText>{JSON.stringify(returnValues)}</ArgsText>
        </Sheet>
      ))}
    </BaseBox>
  </Modal>
);

LogsModal.propTypes = {
  visible: PropTypes.bool,
  logs: PropTypes.arrayOf(PropTypes.any),
  hideLogs: PropTypes.func,
}

LogsModal.defaultProps = {
  visible: false,
  logs: [],
  hideLogs: () => {},
}

const mapStateToProps = (state) => ({
  visible: state.getIn(['logs', 'visible']),
  logs: state.getIn(['logs', 'logs']).toJS(),
})

const mapDispatchToProps = (dispatch) => ({
  hideLogs: () => dispatch(hideLogs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogsModal);
