import types from './types';

export const requestChangePassword = (data) => ({
  type: types.REQUEST_CHANGE_PASSWORD,
  data,
});

export const requestChangePasswordSuccess = () => ({
  type: types.REQUEST_CHANGE_PASSWORD_SUCCESS,
});

export const requestChangePasswordFailure = (errors) => ({
  type: types.REQUEST_CHANGE_PASSWORD_FAILURE,
  errors,
});

export const reset = () => ({
  type: types.RESET,
});
