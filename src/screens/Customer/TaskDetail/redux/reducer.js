import types from './types';

const initialState = {
  requesting: false,
  location: false,
  categoryDetail: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.getEmployeeLocation:
      return {...state, requesting: true};

    case types.getEmployeeLocationSuccess:
      return {...state, requesting: false, location: action.data};

    case types.getEmployeeLocationFailure:
      return {
        ...state,
        location: false,
        requesting: false,
      };

    case types.getCategoryDetail:
      return {...state, requesting: true};

    case types.getCategoryDetailSuccess:
      return {...state, requesting: false, categoryDetail: action.data};

    case types.getCategoryDetailFailure:
      return {
        ...state,
        categoryDetail: false,
        requesting: false,
      };

    default:
      return state;
  }
};
