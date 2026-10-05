import types from './types';

export const postCardData = (data, manageCard) => ({
  type: types.postCardData,
  data,
  manageCard,
});

export const postCardDataSuccess = (data, manageCard) => ({
  type: types.postCardDataSuccess,
  data,
  manageCard,
});

export const postCardDataFailure = (error) => ({
  type: types.postCardDataFailure,
  error,
});

export const deleteCardData = (data, manageCard) => ({
  type: types.deleteCardData,
  data,
  manageCard,
});

export const deleteCardDataSuccess = (data, manageCard) => ({
  type: types.deleteCardDataSuccess,
  data,
  manageCard,
});

export const deleteCardDataFailure = (error) => ({
  type: types.deleteCardDataFailure,
  error,
});

export const setDefaultCardData = (data) => ({
  type: types.setDefaultCardData,
  data,
});

export const setDefaultCardDataSuccess = (data) => ({
  type: types.setDefaultCardDataSuccess,
  data,
});

export const setDefaultCardDataFailure = (error) => ({
  type: types.setDefaultCardDataFailure,
  error,
});
