import types from './types';

const initialState = {
  requesting: false,
  approvedTask: [],
  pendingTask: [],
  availableTime: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.getPendingBookingTaskDetail:
      return {...state, requesting: true};

    case types.getPendingBookingTaskDetailSuccess:
      return {
        ...state,
        requesting: false,
        pendingTask: action.data,
      };

    case types.getPendingBookingTaskDetailFailure:
      return {
        ...state,
        requesting: false,
      };

    case types.getApprovedBookingTaskDetail:
      return {...state, requesting: true};

    case types.getApprovedBookingTaskDetailSuccess:
      return {
        ...state,
        requesting: false,
        approvedTask: action.data,
      };

    case types.getApprovedBookingTaskDetailFailure:
      return {
        ...state,
        requesting: false,
      };

    case types.postTaskDetail:
      return {...state, requesting: true};

    case types.postTaskDetailSuccess:
      return {
        ...state,
        requesting: false,
      };

    case types.postTaskDetailFailure:
      return {
        ...state,
        requesting: false,
      };

    case types.setTimeAvailability:
      return {...state, requesting: true, availableTime: action.data};

    case types.setTimeAvailabilitySuccess:
      return {
        ...state,
        requesting: false,
      };

    case types.setTimeAvailabilityFailure:
      return {
        ...state,
        requesting: false,
      };

    default:
      return state;
  }
};
