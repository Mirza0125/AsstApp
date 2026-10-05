import types from './types';

const initialState = {
  requesting: false,
  employeeServices: false,
  latestService: false,
  requesting: false,
  location: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.getEmployeeHomeData:
      return {...state, requesting: true};

    case types.getEmployeeHomeDataSuccess:
      return {...state, requesting: false, employeeServices: action.data};

    case types.getEmployeeHomeDataFailure:
      return {
        ...state,
        requesting: false,
      };

    case types.getAllServices:
      return {...state, requesting: true};

    case types.getAllServicesSuccess:
      return {...state, requesting: false, allServices: action.data};

    case types.getAllServicesFailure:
      return {
        ...state,
        allServices: false,
        requesting: false,
      };

    case types.addService:
      return {...state, requesting: true};

    case types.addServiceSuccess:
      return {...state, requesting: false, latestService: action.data};

    case types.addServiceFailure:
      return {
        ...state,
        latestService: false,
        requesting: false,
      };

    case types.sendLocation:
      return {...state, location: true};

    case types.sendLocationSuccess:
      return {...state, requesting: false, location: action.data};

    case types.sendLocationFailure:
      return {
        ...state,
        sendLocation: false,
        requesting: false,
      };

    default:
      return state;
  }
};
