import {
  GET_BOOKINGS_REQUEST,
  GET_BOOKINGS_SUCCESS,
  GET_BOOKINGS_FAILURE,
  GET_DATE_VALUE,
  GET_YEAR_VALUE,
  GET_MONTH_VALUE,
  CANCEL_BOOKING_REQUEST,
  CANCEL_BOOKING_SUCCESS,
  CANCEL_BOOKING_FAILURE,
  GET_TIME_SLOT_REQUEST,
  GET_TIME_SLOT_SUCCESS,
  GET_TIME_SLOT_FAILURE,
  SERVICE_ID,
  // Update Time Slots
  UPDATE_TIME_SLOTS_REQUEST,
  UPDATE_TIME_SLOTS_SUCCESS,
  UPDATE_TIME_SLOTS_FAILURE,  
  SET_SLOTS_UPDATE_SUCCESS,
  SET_CANCEL_SUCCESS,
} from "./type"

import dayjs from "dayjs"

const initialState = {
  bookingsData: false,
  error: false,
  requesting: false,
  getYearValue: dayjs(new Date()),
  getMonthValue: dayjs(new Date()),
  getDateValue: dayjs(new Date()),
  timeSlotRequesting: false,
  timeSlotsData: false,
  serviceID: false,
  updateTimeSlotRequesting: false,
  updatedBookingData: false,
  setSuccess: false,
  setCancelSuccess: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKINGS_REQUEST:
      return {
        ...state,
        requesting: true
      }

    case GET_BOOKINGS_SUCCESS:
      return {
        ...state,
        requesting: false,
        bookingsData: action.data
      }
    case GET_BOOKINGS_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data
      }
    case GET_YEAR_VALUE:
      return {
        ...state,
        getYearValue: action.data
      }
    case GET_MONTH_VALUE:
      return {
        ...state,
        getMonthValue: action.data
      }
    case GET_DATE_VALUE:
      return {
        ...state,
        getDateValue: action.data
      }

    // Cancel Booking Reducers
    case CANCEL_BOOKING_REQUEST:
      return {
        ...state,
        cancelBookingRequesting: true
      }

    case CANCEL_BOOKING_SUCCESS:
      return {
        ...state,
        cancelBookingRequesting: false,
        cancelledBookingsData: action.data
      }

    case CANCEL_BOOKING_FAILURE:
    return {
      ...state,
      cancelBookingRequesting: false,
      error: action.data
    }

    // GET Time Slots Reducers
    case GET_TIME_SLOT_REQUEST:
      return {
        ...state,
        timeSlotRequesting: true
      }

    case GET_TIME_SLOT_SUCCESS:
      return {
        ...state,
        timeSlotRequesting: false,
        timeSlotsData: action.data
      }

    case GET_TIME_SLOT_FAILURE:
    return {
      ...state,
      timeSlotRequesting: false,
      error: action.data
    }

    // Reducer for storing Booking Service ID
    case SERVICE_ID:
      return {
        ...state,
        serviceID: action.data,
      }

    // UPDATE Time Slots Reducers
    case UPDATE_TIME_SLOTS_REQUEST:
      return {
        ...state,
        updateTimeSlotRequesting: true
      }

    case UPDATE_TIME_SLOTS_SUCCESS:
      return {
        ...state,
        updateTimeSlotRequesting: false,
        updatedBookingData: action.data
      }

    case UPDATE_TIME_SLOTS_FAILURE:
    return {
      ...state,
      updateTimeSlotRequesting: false,
      updateTimeError: action.data
    }

    // Reducer to store Update time slot success state
    case SET_SLOTS_UPDATE_SUCCESS:
      return {
        ...state,
        setSuccess: action.data,
      } 

    case SET_CANCEL_SUCCESS:
      return {
        ...state,
        setCancelSuccess: action.data
      }

    default:
      return state
  }
}
