import types from './types';

const initialState = {
  requesting: false,
  employeeReview: false,
  employeePhotos: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.getEmployeeReview:
      return {...state, requesting: true};

    case types.getEmployeeReviewSuccess:
      return {...state, requesting: false, employeeReview: action.data};

    case types.getEmployeeReviewFailure:
      return {
        ...state,
        requesting: false,
      };

    case types.getEmployeePhotos:
      return {...state, requesting: true};

    case types.getEmployeePhotosSuccess:
      return {...state, requesting: false, employeePhotos: action.data};

    case types.getEmployeePhotosFailure:
      return {
        ...state,
        requesting: false,
      };

    default:
      return state;
  }
};
