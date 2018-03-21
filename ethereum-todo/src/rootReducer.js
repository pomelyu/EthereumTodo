import { combineReducers } from 'redux-immutable';
import todo from './duck/todo';
import logs from './duck/logs';
import transaction from './duck/transaction'

const rootReducer = combineReducers({
  todo,
  logs,
  transaction,
});

export default rootReducer;
