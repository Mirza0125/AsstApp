import types from './types';

const initialState = {
  cardData: false,
  requesting: false,
  defaultCard: false,
  cardDeleted: false,
  isCardAdded: false,
  serverErrors: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.postCardData:
      return {...state, requesting: true};

    case types.postCardDataSuccess:
      return {
        ...state,
        requesting: false,
        isCardAdded: true,
        serverErrors: false,
        cardData: action.data,
      };

    case types.postCardDataFailure:
      return {...state, requesting: false, serverErrors: action.error};

    case types.deleteCardData:
      return {...state, requesting: true};

    case types.deleteCardDataSuccess:
      return {
        ...state,
        requesting: false,
        serverErrors: false,
        cardDeleted: true,
      };

    case types.deleteCardDataFailure:
      return {...state, requesting: false, serverErrors: action.error};

    case types.setDefaultCardData:
      return {...state, requesting: true};

    case types.setDefaultCardDataSuccess:
      return {
        ...state,
        requesting: false,
        serverErrors: false,
        defaultCard: action.data,
      };

    case types.setDefaultCardDataFailure:
      return {...state, requesting: false, serverErrors: action.error};

    default:
      return state;
  }
};
