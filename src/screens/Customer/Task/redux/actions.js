import types from './types';

export const getBookingDetail = () => ({
  type: types.getBookingDetail,
});

export const getBookingDetailSuccess = (data) => ({
  type: types.getBookingDetailSuccess,
  data,
});

export const getBookingDetailFailure = () => ({
  type: types.getBookingDetailFailure,
});
