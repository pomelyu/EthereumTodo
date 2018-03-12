import { combineReducers } from 'redux-immutable';
import todo from './duck/todo';
import transaction from './duck/transaction'

const rootReducer = combineReducers({
  todo,
  transaction,
});

export default rootReducer;
