import types from './types';

const initialState = {
  requesting: false,
  profile: false,
  filterResult: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.selectProfile:
      return {...state, requesting: true};

    case types.selectProfileSuccess:
      return {...state, requesting: false, profile: action.data};

    case types.selectProfileFailure:
      return {
        ...state,
        requesting: false,
      };

    case types.filterServices:
      return {...state, requesting: true};

    case types.filterServicesSuccess:
      return {...state, requesting: false, filterResult: action.data};

    case types.filterServicesFailure:
      return {
        ...state,
        requesting: false,
      };

    default:
      return state;
  }
};
