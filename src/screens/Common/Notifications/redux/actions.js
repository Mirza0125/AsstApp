import types from './types';

export const isSeen = (data) => ({
  type: types.isSeen,
  data,
});

export const isSeenSuccess = (data) => ({
  type: types.isSeenSuccess,
  data,
});

export const isSeenFailure = () => ({
  type: types.isSeenFailure,
});

export const getNotification = (data) => ({
  type: types.getNotification,
  data,
});

export const getNotificationSuccess = (data) => ({
  type: types.getNotificationSuccess,
  data,
});

export const getNotificationFailure = () => ({
  type: types.getNotificationFailure,
});

export const setDetails = (data) => ({
  type: types.setDetails,
  data,
});

export const setDetailsSuccess = (data) => ({
  type: types.setDetailsSuccess,
  data,
});

export const setDetailsFailure = () => ({
  type: types.setDetailsFailure,
});
