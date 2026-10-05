import {
  GET_ONGOING_BOOKINGS_REQUEST,
  GET_ONGOING_BOOKINGS_SUCCESS,
  GET_ONGOING_BOOKINGS_FAILURE,
  GET_UPCOMING_BOOKINGS_REQUEST,
  GET_UPCOMING_BOOKINGS_SUCCESS,
  GET_UPCOMING_BOOKINGS_FAILURE,
  GET_COMPLETED_BOOKINGS_REQUEST,
  GET_COMPLETED_BOOKINGS_SUCCESS,
  GET_COMPLETED_BOOKINGS_FAILURE,
  SET_ACTIVE_STATUS,
} from "./type"

const initialState = {
  ongoingBookings: false,
  upcomingBookings: false,
  completedBookings: false,
  error: false,
  requesting: false,
  activeStatus: 'pending'
}

export default (state = initialState, action) => {
  switch (action.type) {
    // ONGOING bookings reducer
    case GET_ONGOING_BOOKINGS_REQUEST:
      return {
        ...state,
        requesting: true
      }

    case GET_ONGOING_BOOKINGS_SUCCESS:
      return {
        ...state,
        requesting: false,
        ongoingBookings: action.data
      }
    case GET_ONGOING_BOOKINGS_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data
      }

    // UPCOMING bookings reducer
    case GET_UPCOMING_BOOKINGS_REQUEST:
      return {
        ...state,
        requesting: true
      }

    case GET_UPCOMING_BOOKINGS_SUCCESS:
      return {
        ...state,
        requesting: false,
        upcomingBookings: action.data
      }
    case GET_UPCOMING_BOOKINGS_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data
      }

    // COMPLETED bookings reducer
    case GET_COMPLETED_BOOKINGS_REQUEST:
      return {
        ...state,
        requesting: true
      }

    case GET_COMPLETED_BOOKINGS_SUCCESS:
      return {
        ...state,
        requesting: false,
        completedBookings: action.data
      }
    case GET_COMPLETED_BOOKINGS_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data
      }
    
    case SET_ACTIVE_STATUS:
      return {
        ...state,
        activeStatus: action.data
      }

    default:
      return state
  }
}
