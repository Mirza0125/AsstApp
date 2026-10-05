import types from './types';

export const requestNewPassword = (data) => ({
  type: types.REQUEST_NEW_PASSWORD,
  data,
});

export const requestNewPasswordSuccess = () => ({
  type: types.REQUEST_NEW_PASSWORD_SUCCESS,
});

export const requestNewPasswordFailure = (errors) => ({
  type: types.REQUEST_NEW_PASSWORD_FAILURE,
  errors,
});

export const reset = () => ({
  type: types.RESET,
});
