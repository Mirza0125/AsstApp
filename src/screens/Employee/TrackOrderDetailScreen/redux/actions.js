import types from './types';

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
