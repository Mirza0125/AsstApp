import types from './types';

const initialState = {
  requesting: false,
  cardDetail: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.getCardData:
      return {...state, requesting: true};

    case types.getCardDataSuccess:
      return {...state, requesting: false, cardDetail: action.data};

    case types.getCardDataFailure:
      return {
        ...state,
        requesting: false,
      };

    default:
      return state;
  }
};
