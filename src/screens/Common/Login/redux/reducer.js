import types from './types';

const initialState = {
  user: false,
  requesting: false,
  isAuth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.login:
      return {...state, requesting: true};

    case types.loginFailure:
      return {...state, requesting: false};

    case types.setUserInfo:
      return {
        ...state,
        requesting: false,
        user: action.data.user,
        isAuth: action.data.token,
      };

    case types.logout:
      return {...state, ...initialState};

    case types.reset:
      return {...state, ...initialState};

    default:
      return state;
  }
};
