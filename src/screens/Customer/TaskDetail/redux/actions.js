import types from './types';

export const getEmployeeLocation = (id) => ({
  type: types.getEmployeeLocation,
  id,
});

export const getEmployeeLocationSuccess = (data) => ({
  type: types.getEmployeeLocationSuccess,
  data,
});

export const getEmployeeLocationFailure = () => ({
  type: types.getEmployeeLocationFailure,
});

export const getCategoryDetail = (id) => ({
  type: types.getCategoryDetail,
  id,
});

export const getCategoryDetailSuccess = (data) => ({
  type: types.getCategoryDetailSuccess,
  data,
});

export const getCategoryDetailFailure = () => ({
  type: types.getCategoryDetailFailure,
});
