import Immutable from 'immutable';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from './rootReducer';

const initialState = Immutable.Map();

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk),
);

export default store;
