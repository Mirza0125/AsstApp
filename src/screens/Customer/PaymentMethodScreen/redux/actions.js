import types from './types';

export const getCardData = () => ({
  type: types.getCardData,
});

export const getCardDataSuccess = (data) => ({
  type: types.getCardDataSuccess,
  data,
});

export const getCardDataFailure = () => ({
  type: types.getCardDataFailure,
});
