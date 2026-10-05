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

// ONGOING bookings actions
export const ongoingBookingsRequest = (data) => ({
  type: GET_ONGOING_BOOKINGS_REQUEST,
  data
})

export const ongoingBookingsSuccess = data => ({
  type: GET_ONGOING_BOOKINGS_SUCCESS,
  data
})

export const ongoingBookingsFailure = data => ({
  type: GET_ONGOING_BOOKINGS_FAILURE,
  data
})

// UPCOMING bookings actions
export const upcomingBookingsRequest = (data) => ({
  type: GET_UPCOMING_BOOKINGS_REQUEST,
  data
})

export const upcomingBookingsSuccess = data => ({
  type: GET_UPCOMING_BOOKINGS_SUCCESS,
  data
})

export const upcomingBookingsFailure = data => ({
  type: GET_UPCOMING_BOOKINGS_FAILURE,
  data
})

// COMPLETED bookings actions
export const completedBookingsRequest = (data) => ({
  type: GET_COMPLETED_BOOKINGS_REQUEST,
  data
})

export const completedBookingsSuccess = data => ({
  type: GET_COMPLETED_BOOKINGS_SUCCESS,
  data
})

export const completedBookingsFailure = data => ({
  type: GET_COMPLETED_BOOKINGS_FAILURE,
  data
})

// Set Active Status State Action
export const activeStatusAction = data => ({
  type: SET_ACTIVE_STATUS,
  data
})
