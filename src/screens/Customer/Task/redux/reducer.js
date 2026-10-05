import types from './types';

const initialState = {
  requesting: false,
  bookingDetail: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.getBookingDetail:
      return {...state, requesting: true};

    case types.getBookingDetailSuccess:
      return {...state, requesting: false, bookingDetail: action.data};

    case types.getBookingDetailFailure:
      return {
        ...state,
        requesting: false,
      };

    default:
      return state;
  }
};
