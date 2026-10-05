import types from './types';

const initialState = {
  requesting: false,
  employeesOfferingService: [],
  availableSlots: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.getEmployessByServiceId:
      return {
        ...state,
        requesting: true,
      };

    case types.getEmployessByServiceIdSuccess:
      return {
        ...state,
        employeesOfferingService: action.data,
        requesting: false,
      };

    case types.getEmployessByServiceIdFailure:
      return {
        ...state,
        employeesOfferingService: [],
        requesting: false,
      };

    case types.getAvailableSlotsByEmployee:
      return {
        ...state,
        requesting: true,
      };

    case types.getAvailableSlotsByEmployeeSuccess:
      return {
        ...state,
        availableSlots: action.data,
        requesting: false,
      };

    case types.getAvailableSlotsByEmployeeFailure:
      return {
        ...state,
        availableSlots: [],
        requesting: false,
      };

    default:
      return state;
  }
};
