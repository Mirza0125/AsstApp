import types from './types';

const initialState = {
  requesting: false,
  services: false,
  // searchedResult: false,
  // requestingSearch: false,
  // selectService: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.getHomeData:
      return {...state, requesting: true};

    case types.getHomeDataSuccess:
      return {...state, requesting: false, services: action.data};

    case types.getHomeDataFailure:
      return {
        ...state,
        requesting: false,
      };

    // case types.searchServices:
    //   return {...state, requestingSearch: true};

    // case types.searchServicesSuccess:
    //   return {...state, requesting: false, searchedResult: action.data};

    // case types.resetSearchServices:
    //   return {
    //     ...state,
    //     searchedResult: false,
    //     requesting: false,
    //   };

    //   case types.selectService:
    //   return {...state, selectService: true};

    // case types.selectServiceSuccess:
    //   return {...state, requesting: false, selectService: action.data};

    // case types.resetSelectService:
    //   return {
    //     ...state,
    //     selectService: false,
    //     requesting: false,
    //   };

    default:
      return state;
  }
};
