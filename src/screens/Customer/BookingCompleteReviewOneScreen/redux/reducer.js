import {POST_REVIEW, POST_REVIEW_SUCCESS, POST_REVIEW_FAILURE} from './types';

const initialState = {
  requesting: false,
  reviews: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_REVIEW:
      return {...state, requesting: true};

    case POST_REVIEW_SUCCESS:
      return {...state, requesting: false, reviews: action.data};

    case POST_REVIEW_FAILURE:
      return {
        ...state,
        requesting: false,
      };

    default:
      return state;
  }
};
