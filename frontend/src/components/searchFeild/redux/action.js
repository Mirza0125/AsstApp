import {
  // Search in residents table types ----start----
  SEARCH_RESIDENTS_REQUEST,
  SEARCH_RESIDENTS_SUCCESS,
  SEARCH_RESIDENTS_FAILURE,
  // Search in residents table types ----end----
  // Search in designers table types ----start----
  SEARCH_DESIGNERS_REQUEST,
  SEARCH_DESIGNERS_SUCCESS,
  SEARCH_DESIGNERS_FAILURE,
  // Search in designers table types ----end----
  // Search in bookings table types ----start----
  GET_BOOKINGS_BY_STATUS_REQUEST,
  GET_BOOKINGS_BY_STATUS_SUCCESS,
  GET_BOOKINGS_BY_STATUS_FAILURE,
  // Search in bookings table types ----end----
  // Search services types ----start----
  SEARCH_SERVICES_REQUEST,
  SEARCH_SERVICES_SUCCESS,
  SEARCH_SERVICES_FAILURE,
  // Search services types ----end----
} from "./type"

// Search in residents table actions -------------start-------------
export const searchResidentsRequest = (data) => ({
  type: SEARCH_RESIDENTS_REQUEST,
  data
})

export const searchResidentsSuccess = data => ({
  type: SEARCH_RESIDENTS_SUCCESS,
  data
})

export const searchResidentsFailure = data => ({
  type: SEARCH_RESIDENTS_FAILURE,
  data
})
// Search in residents table actions -------------end-------------

// Search in designers table actions -------------start-------------
export const searchDesignersRequest = (data) => ({
  type: SEARCH_DESIGNERS_REQUEST,
  data
})

export const searchDesignersSuccess = data => ({
  type: SEARCH_DESIGNERS_SUCCESS,
  data
})

export const searchDesignersFailure = data => ({
  type: SEARCH_DESIGNERS_FAILURE,
  data
})
// Search in designers table actions -------------end-------------

// Search in bookings table actions -------------start-------------
export const getBookingsbyStatusRequest = (data) => ({
  type: GET_BOOKINGS_BY_STATUS_REQUEST,
  data
})

export const getBookingsbyStatusSuccess = data => ({
  type: GET_BOOKINGS_BY_STATUS_SUCCESS,
  data
})

export const getBookingsbyStatusFailure = data => ({
  type: GET_BOOKINGS_BY_STATUS_FAILURE,
  data
})
// Search in bookings table actions -------------end-------------

// Search services actions -------------start-------------
export const searchServicesRequest = (data) => ({
  type: SEARCH_SERVICES_REQUEST,
  data
})

export const searchServicesSuccess = data => ({
  type: SEARCH_SERVICES_SUCCESS,
  data
})

export const searchServicesFailure = data => ({
  type: SEARCH_SERVICES_FAILURE,
  data
})
// Search services actions -------------end-------------
