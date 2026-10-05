import types from './types';

const initialState = {
  bookings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.getBookings:
      return {
        ...state,
        requesting: true,
      };

    case types.getBookingsSuccess:
      return {
        ...state,
        bookings: action.data,
        requesting: true,
      };

    case types.getBookingsFailure:
      return {
        ...state,
        bookings: [],
        requesting: true,
      };
    default:
      return state;
  }
};
