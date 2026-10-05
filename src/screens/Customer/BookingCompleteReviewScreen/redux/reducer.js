import types from './types';

const initialState = {
  requesting: false,
  review: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.postReview:
      return {...state, requesting: true};

    case types.postReviewSuccess:
      return {...state, requesting: false, review: action.data};

    case types.postReviewFailure:
      return {
        ...state,
        requesting: false,
      };

    default:
      return state;
  }
};
