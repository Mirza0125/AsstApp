import types from './types';

const initialState = {
  requesting: false,
  bookingDetail: false,
  notification: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.postBookingDetail:
      return {...state, requesting: true};

    case types.postBookingDetailSuccess:
      return {...state, requesting: false, bookingDetail: action.data};

    case types.postBookingDetailFailure:
      return {
        ...state,
        requesting: false,
      };

    case types.postNotification:
      return {...state, requesting: true};

    case types.postNotificationSuccess:
      return {...state, requesting: false, notification: action.data};

    case types.postNotificationFailure:
      return {
        ...state,
        requesting: false,
      };

    default:
      return state;
  }
};
