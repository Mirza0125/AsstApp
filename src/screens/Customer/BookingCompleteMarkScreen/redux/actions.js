import types from './types';

export const addCharge = (data, notification) => ({
  type: types.addCharge,
  data,
  notification,
});

export const addChargeSuccess = (data) => ({
  type: types.addChargeSuccess,
  data,
});

export const addChargeFailure = (error) => ({
  type: types.addChargeFailure,
  error,
});
