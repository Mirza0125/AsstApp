import types from './types';

const initialState = {
  requesting: false,
  events: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_EVENTS:
      return {
        ...state,
        requesting: true,
      };

    case types.GET_EVENTS_SUCCESS:
      return {
        ...state,
        requesting: false,
        events: action.data,
      };

    case types.GET_EVENTS_FAILURE:
      return {
        ...state,
        requesting: false,
        events: [],
      };
    default:
      return state;
  }
};
