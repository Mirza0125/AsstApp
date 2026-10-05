import types from './types';

export const postBookingDetail = (data) => ({
  type: types.postBookingDetail,
  data,
});

export const postBookingDetailSuccess = (data) => ({
  type: types.postBookingDetailSuccess,
  data,
});

export const postBookingDetailFailure = () => ({
  type: types.postBookingDetailFailure,
});

export const postNotification = (data) => ({
  type: types.postNotification,
  data,
});

export const postNotificationSuccess = (data) => ({
  type: types.postNotificationSuccess,
  data,
});

export const postNotificationFailure = () => ({
  type: types.postNotificationFailure,
});
