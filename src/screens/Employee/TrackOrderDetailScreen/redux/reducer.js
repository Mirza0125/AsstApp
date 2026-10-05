import types from './types';

const initialState = {
  requesting: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.postTaskDetail:
      return {...state, requesting: true};

    case types.postTaskDetailSuccess:
      return {
        ...state,
        requesting: false,
      };

    case types.postTaskDetailFailure:
      return {
        ...state,
        requesting: false,
      };

    default:
      return state;
  }
};
