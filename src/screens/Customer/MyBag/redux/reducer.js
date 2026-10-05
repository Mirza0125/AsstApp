import types from './types';

const initialState = {
  requesting: false,
  bagServices: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.getBagServices:
      return {...state, requesting: true};

    case types.getBagServicesSuccess:
      return {...state, requesting: false, bagServices: action.data};

    case types.getBagServicesFailure:
      return {
        ...state,
        requesting: false,
      };

    default:
      return state;
  }
};
