import types from './types';

export const getBagServices = (data) => ({
  type: types.getBagServices,
  data,
});

export const getBagServicesSuccess = (data) => ({
  type: types.getBagServicesSuccess,
  data,
});

export const getBagServicesFailure = () => ({
  type: types.getBagServicesFailure,
});
