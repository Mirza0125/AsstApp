import types from './types';

export const requestPasswordReset = (email, password) => ({
  type: types.REQUEST_PASSWORD_RESET,
  email,
  password,
});

export const requestPasswordResetSuccess = () => ({
  type: types.REQUEST_PASSWORD_RESET_SUCCESS,
});

export const requestPasswordResetFailure = (errors) => ({
  type: types.REQUEST_PASSWORD_RESET_FAILURE,
  errors,
});

export const verifyPasswordReset = (data) => ({
  type: types.VERIFY_PASSWORD_RESET,
  data,
});

export const reset = () => ({
  type: types.RESET,
});
