import types from './types';

const initialState = {
  requesting: false,
  backendErrors: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_NEW_PASSWORD:
      return {...state, requesting: true};

    case types.RESET:
    case types.REQUEST_NEW_PASSWORD_SUCCESS:
      return {...state, ...initialState};

    case types.REQUEST_NEW_PASSWORD_FAILURE:
      return {...state, requesting: false, backendErrors: action.errors};

    default:
      return state;
  }
};
