import types from './types';

export const getBookings = (data) => ({
  type: types.getBookings,
  data,
});

export const getBookingsSuccess = (data) => ({
  type: types.getBookingsSuccess,
  data,
});

export const getBookingsFailure = () => ({
  type: types.getBookingsFailure,
});
