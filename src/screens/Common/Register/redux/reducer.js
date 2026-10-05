import types from './types';

const initialState = {
  requesting: false,
  serverErrors: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.register:
      return {...state, requesting: true};

    case types.reset_server_error:
      return {...state, serverErrors: false};

    case types.sign_up_success:
      return {...state, requesting: false, serverErrors: false};

    case types.sign_up_failure:
      return {...state, requesting: false, serverErrors: action.error};

    default:
      return state;
  }
};
