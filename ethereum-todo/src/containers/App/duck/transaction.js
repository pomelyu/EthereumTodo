import Immutable from 'immutable';

const SET_TRANSACTION_STATE = 'transaction/SET_TRANSACTION_STATE';

export const StateEnum = {
  NORMAL: 'NORMAL',
  PENDING: 'PENDING',
  ERROR: 'ERROR',
};

const TransactionState = Immutable.fromJS({
  state: StateEnum.NORMAL,
});

export const transactionPending = () => {
  console.log('Pending');
  return {
    type: SET_TRANSACTION_STATE,
    payload: { state: StateEnum.PENDING },
  };
};

export const transactionError = (error) => {
  console.error(error);
  return {
    type: SET_TRANSACTION_STATE,
    payload: { state: StateEnum.ERROR },
  };
};

export const transactionFinished = () => {
  console.log('Finished');
  return {
    type: SET_TRANSACTION_STATE,
    payload: { state: StateEnum.NORMAL },
  };
};


const reducer = (state = TransactionState, action) => {
  switch (action.type) {
    case SET_TRANSACTION_STATE:
      return state.set('state', action.payload.state);
    default:
      return state
  }
}

export default reducer;
