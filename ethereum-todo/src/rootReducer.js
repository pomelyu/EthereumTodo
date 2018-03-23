import { combineReducers } from 'redux-immutable';
import AppReducers from 'containers/App/duck';

const rootReducer = combineReducers({
  ...AppReducers,
});

export default rootReducer;
