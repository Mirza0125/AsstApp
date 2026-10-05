import types from './types';

export const register = (data) => ({
  type: types.register,
  data,
});

export const resetServerError = () => ({
  type: types.reset_server_error,
});

export const signUpSuccess = (data) => ({
  type: types.sign_up_success,
  data,
});

export const signUpFailure = (error) => ({
  type: types.sign_up_failure,
  error,
});

export const registerMobileDevice = (data) => ({
  type: types.register_mobile_device,
  data,
});
