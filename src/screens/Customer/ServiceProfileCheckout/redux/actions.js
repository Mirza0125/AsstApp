import types from './types';

export const getEmployeeReview = (id) => ({
  type: types.getEmployeeReview,
  id,
});

export const getEmployeeReviewSuccess = (data) => ({
  type: types.getEmployeeReviewSuccess,
  data,
});

export const getEmployeeReviewFailure = () => ({
  type: types.getEmployeeReviewFailure,
});

export const getEmployeePhotos = (profile) => ({
  type: types.getEmployeePhotos,
  profile,
});

export const getEmployeePhotosSuccess = (data) => ({
  type: types.getEmployeePhotosSuccess,
  data,
});

export const getEmployeePhotosFailure = () => ({
  type: types.getEmployeePhotosFailure,
});
