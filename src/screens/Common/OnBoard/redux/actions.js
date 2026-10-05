import types from './types';

export const getOnBoardData = () => ({
  type: types.getOnBoardData,
});

export const getOnBoardDataSuccess = (data) => ({
  type: types.getOnBoardDataSuccess,
  data,
});

export const getOnBoardDataFailure = () => ({
  type: types.getOnBoardDataFailure,
});
