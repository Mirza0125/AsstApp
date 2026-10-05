import types from './types';

const initialState = {
  requesting: false,
  isSeen: false,
  paymentDetails: false,
  notificationsData: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.isSeen:
      return {...state, requesting: true};

    case types.isSeenSuccess:
      return {...state, requesting: false, isSeen: action.data};

    case types.isSeenFailure:
      return {
        ...state,
        requesting: false,
      };

    case types.getNotification:
      return {...state, requesting: true};

    case types.getNotificationSuccess:
      return {...state, requesting: false, notificationsData: action.data};

    case types.getNotificationFailure:
      return {
        ...state,
        requesting: false,
      };

    case types.setDetails:
      return {...state, requesting: true, paymentDetails: action.data};

    case types.setDetailsSuccess:
      return {...state, requesting: false, paymentDetails: action.data};

    case types.setDetailsFailure:
      return {
        ...state,
        requesting: false,
      };

    default:
      return state;
  }
};
