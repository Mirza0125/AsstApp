import types from './types';

export const selectProfile = (id) => ({
  type: types.selectProfile,
  id,
});

export const selectProfileSuccess = (data) => ({
  type: types.selectProfileSuccess,
  data,
});

export const selectProfileFailure = () => ({
  type: types.selectProfileFailure,
});

export const filterServices = (id, alphabetical, rating, repeated) => ({
  type: types.filterServices,
  id,
  alphabetical,
  rating,
  repeated,
});

export const filterServicesSuccess = (data) => ({
  type: types.filterServicesSuccess,
  data,
});

export const filterServicesFailure = () => ({
  type: types.filterServicesFailure,
});
