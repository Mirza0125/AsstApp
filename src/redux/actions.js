import types from './types';

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
