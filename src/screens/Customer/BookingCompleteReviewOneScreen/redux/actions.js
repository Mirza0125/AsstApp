import {POST_REVIEW, POST_REVIEW_SUCCESS, POST_REVIEW_FAILURE} from './types';

export const postReview = (data) => ({
  type: POST_REVIEW,
  data,
});

export const postReviewSuccess = (data) => ({
  type: POST_REVIEW_SUCCESS,
  data,
});

export const postReviewFailure = () => ({
  type: POST_REVIEW_FAILURE,
});
