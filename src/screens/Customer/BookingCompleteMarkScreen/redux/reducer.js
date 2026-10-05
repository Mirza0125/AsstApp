import types from './types';

const initialState = {
  requesting: false,
  serverErrors: false,
  isCardCharged: false,
  transactionInfo: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.addCharge:
      return {...state, requesting: true};

    case types.addChargeSuccess:
      return {
        ...state,
        requesting: false,
        serverErrors: false,
        isCardCharged: true,
        transactionInfo: action.data,
      };

    case types.addChargeFailure:
      return {
        ...state,
        requesting: false,
        isCardCharged: false,
        transactionInfo: false,
        serverErrors: action.error,
      };

    default:
      return state;
  }
};
