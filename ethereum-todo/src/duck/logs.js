import Immutable from 'immutable';
import * as logHelper from '../helpers/log_helper';

import { transactionPending, transactionError, transactionFinished } from './transaction';

const SHOW_LOGS = 'logs/SHOW_LOGS';
const HIDE_LOGS = 'logs/HIDE_LOGS';
const UPDATE_LOGS = 'logs/UPDATE_LOGS';

const LogState = Immutable.fromJS({
  visible: false,
  logs: []
});

const updateLogs = (logs) => ({
  type: UPDATE_LOGS,
  payload: { logs },
})

export const showLogs = () => async (dispatch) => {
  dispatch({ type: SHOW_LOGS });
  dispatch(transactionPending());
  try {
    const allEvents = await logHelper.getAllEventsAsync();
    const logs = allEvents.map(({ blockNumber, event, returnValues }) => ({
      blockNumber,
      event,
      returnValues,
    }));
    dispatch(updateLogs(logs));
    dispatch(transactionFinished());
  } catch (error) {
    dispatch(transactionError(error));
  }
}

export const hideLogs = () => ({
  type: HIDE_LOGS,
});

const reducer = (state = LogState, action) => {
  switch (action.type) {
    case SHOW_LOGS:
      return state.set('visible', true);
    case HIDE_LOGS:
      return state.set('visible', false);
    case UPDATE_LOGS:
      return state.set('logs', Immutable.fromJS(action.payload.logs));
    default:
      return state;
  }
};

export default reducer;
