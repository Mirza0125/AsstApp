import types from './types';

export const postReview = (data) => ({
  type: types.postReview,
  data,
});

export const postReviewSuccess = (data) => ({
  type: types.postReviewSuccess,
  data,
});

export const postReviewFailure = () => ({
  type: types.postReviewFailure,
});
