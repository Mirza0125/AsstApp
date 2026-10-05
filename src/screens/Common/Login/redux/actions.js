import types from './types';

export const login = (data) => ({
  type: types.login,
  data,
});

export const setUserInfo = (data) => ({
  type: types.setUserInfo,
  data,
});

export const loginFailure = () => ({
  type: types.loginFailure,
});

export const logout = () => ({
  type: types.logout,
});

export const reset = () => ({
  type: types.reset,
});
