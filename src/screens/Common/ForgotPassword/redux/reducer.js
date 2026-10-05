import types from './types';

const initialState = {
  requesting: false,
  backendErrors: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_PASSWORD_RESET:
    case types.VERIFY_PASSWORD_RESET:
      return {...state, requesting: true};

    case types.RESET:
    case types.REQUEST_PASSWORD_RESET_SUCCESS:
      return {...state, ...initialState};

    case types.REQUEST_PASSWORD_RESET_FAILURE:
      return {...state, requesting: false, backendErrors: action.errors};

    default:
      return state;
  }
};
