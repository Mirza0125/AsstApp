import types from './types';

export const getPendingBookingTaskDetail = () => ({
  type: types.getPendingBookingTaskDetail,
});

export const getPendingBookingTaskDetailSuccess = (data) => ({
  type: types.getPendingBookingTaskDetailSuccess,
  data,
});

export const getPendingBookingTaskDetailFailure = () => ({
  type: types.getPendingBookingTaskDetailFailure,
});

export const getApprovedBookingTaskDetail = () => ({
  type: types.getApprovedBookingTaskDetail,
});

export const getApprovedBookingTaskDetailSuccess = (data) => ({
  type: types.getApprovedBookingTaskDetailSuccess,
  data,
});

export const getApprovedBookingTaskDetailFailure = () => ({
  type: types.getApprovedBookingTaskDetailFailure,
});

export const postTaskDetail = (data, id) => ({
  type: types.postTaskDetail,
  data,
  id,
});

export const postTaskDetailSuccess = () => ({
  type: types.postTaskDetailSuccess,
});

export const postTaskDetailFailure = () => ({
  type: types.postTaskDetailFailure,
});

export const setTimeAvailability = (data) => ({
  type: types.setTimeAvailability,
  data,
});

export const setTimeAvailabilitySuccess = () => ({
  type: types.setTimeAvailabilitySuccess,
});

export const setTimeAvailabilityFailure = () => ({
  type: types.setTimeAvailabilityFailure,
});

export const createProduct = (data) => ({
  type: types.createProduct,
  data,
});
