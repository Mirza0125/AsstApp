import types from './types';

export const getEmployeeHomeData = () => ({
  type: types.getEmployeeHomeData,
});

export const getEmployeeHomeDataSuccess = (data) => ({
  type: types.getEmployeeHomeDataSuccess,
  data,
});

export const getEmployeeHomeDataFailure = () => ({
  type: types.getEmployeeHomeDataFailure,
});

export const getAllServices = () => ({
  type: types.getAllServices,
});

export const getAllServicesSuccess = (data) => ({
  type: types.getAllServicesSuccess,
  data,
});

export const getAllServicesFailure = () => ({
  type: types.getAllServicesFailure,
});

export const addService = (data) => ({
  type: types.addService,
  data,
});

export const addServiceSuccess = (data) => ({
  type: types.addServiceSuccess,
  data,
});

export const addServiceFailure = () => ({
  type: types.addServiceFailure,
});

export const sendLocation = (item) => ({
  type: types.sendLocation,
  item,
});

export const sendLocationSuccess = (data) => ({
  type: types.sendLocationSuccess,
  data,
});

export const sendLocationFailure = () => ({
  type: types.sendLocationFailure,
});
