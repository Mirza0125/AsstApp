import types from './types';

export const getPastOrders = () => ({
  type: types.getPastOrders,
});

export const getPastOrdersSuccess = (data) => ({
  type: types.getPastOrdersSuccess,
  data,
});

export const getPastOrdersFailure = () => ({
  type: types.getPastOrdersFailure,
});
