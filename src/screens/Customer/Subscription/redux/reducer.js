import types from './types';

const initialState = {
  requesting: false,
  subscriptionDetail: false,
  subscription: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.getSubscription:
      return {...state, requesting: true};

    case types.getSubscriptionSuccess:
      return {...state, requesting: false, subscriptionDetail: action.data};

    case types.getSubscriptionFailure:
      return {
        ...state,
        requesting: false,
      };

    case types.createSubscription:
      return {...state, requesting: true};

    case types.createSubscriptionSuccess:
      return {...state, requesting: false, subscription: action.data};

    case types.createSubscriptionFailure:
      return {
        ...state,
        requesting: false,
      };

    default:
      return state;
  }
};
