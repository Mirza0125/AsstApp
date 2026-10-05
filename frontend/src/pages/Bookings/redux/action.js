import {
  GET_BOOKINGS_REQUEST,
  GET_BOOKINGS_SUCCESS,
  GET_BOOKINGS_FAILURE,
  GET_DATE_VALUE,
  GET_YEAR_VALUE,
  GET_MONTH_VALUE,
  BOOKING_DATE_VALUE,
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
  SET_CANCEL_SUCCESS
} from "./type"

// GET Bookings Actions
export const bookingsRequest = (data) => ({
  type: GET_BOOKINGS_REQUEST,
  data
})

export const bookingsSuccess = data => ({
  type: GET_BOOKINGS_SUCCESS,
  data
})

export const bookingsFailure = data => ({
  type: GET_BOOKINGS_FAILURE,
  data
})
export const yearValue = data => ({
  type: GET_YEAR_VALUE,
  data
})
export const monthValue = data => ({
  type: GET_MONTH_VALUE,
  data
})
export const dateValue = data => ({
  type: GET_DATE_VALUE,
  data
})

// Cancel Booking Actions
export const cancelBookingRequest = booking_id => ({
  type: CANCEL_BOOKING_REQUEST,
  booking_id
})

export const cancelBookingSuccess = booking_id => ({
  type: CANCEL_BOOKING_SUCCESS,
  booking_id
})

export const cancelBookingFailure = booking_id => ({
  type: CANCEL_BOOKING_FAILURE,
  booking_id
})

// GET Time Slots
export const getTimeSlotRequest = data => ({
  type: GET_TIME_SLOT_REQUEST,
  data
})

export const getTimeSlotSuccess = data => ({
  type: GET_TIME_SLOT_SUCCESS,
  data
})

export const getTimeSlotFailure = data => ({
  type: GET_TIME_SLOT_FAILURE,
  data
})

// Action for storing Booking Service ID
export const serviceIDAction = data => ({
  type: SERVICE_ID,
  data
})

// UPDATE Time Slots
export const updateTimeSlotRequest = data => ({
  type: UPDATE_TIME_SLOTS_REQUEST,
  data
})

export const updateTimeSlotSuccess = data => ({
  type: UPDATE_TIME_SLOTS_SUCCESS,
  data
})

export const updateTimeSlotFailure = data => ({
  type: UPDATE_TIME_SLOTS_FAILURE,
  data
})

// Action for storing state
export const setSlotsSuccessAction = data => ({
  type: SET_SLOTS_UPDATE_SUCCESS,
  data
})

// Set Success for Cancel Booking
export const setCancelSuccessAction = data => ({
  type: SET_CANCEL_SUCCESS,
  data
})
