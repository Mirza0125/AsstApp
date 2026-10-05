import types from './types';

const initialState = {
  requesting: false,
  pastOrders: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.getPastOrders:
      return {...state, requesting: true};

    case types.getPastOrdersSuccess:
      return {...state, requesting: false, pastOrders: action.data};

    case types.getPastOrdersFailure:
      return {
        ...state,
        requesting: false,
      };

    default:
      return state;
  }
};
