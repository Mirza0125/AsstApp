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

const initialState = {
  // Residents States ----start----
  residentsFilteredData: false,
  error: false,
  residentsRequesting: false,
  // Residents States ----end----

  // Designers States ----start----
  designersFilteredData: false,
  designersError: false,
  designersRequesting: false,
  // Designers States ----end----
  bookingsByStatusRequesting: false,
  bookingsSearchError: false,
  bookingsFilteredData: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    // Search Residents Reducers -------------start-------------
    case SEARCH_RESIDENTS_REQUEST:
      return {
        ...state,
        residentsRequesting: true
      }

    case SEARCH_RESIDENTS_SUCCESS:
      return {
        ...state,
        residentsRequesting: false,
        residentsFilteredData: action.data
      }
    case SEARCH_RESIDENTS_FAILURE:
      return {
        ...state,
        residentsRequesting: false,
        error: action.data
      }
    // Search Residents Reducers -------------end-------------

    // Search Designers Reducers -------------start-------------
    case SEARCH_DESIGNERS_REQUEST:
      return {
        ...state,
        designersRequesting: true
      }

    case SEARCH_DESIGNERS_SUCCESS:
      return {
        ...state,
        designersRequesting: false,
        designersFilteredData: action.data
      }
    case SEARCH_DESIGNERS_FAILURE:
      return {
        ...state,
        designersRequesting: false,
        designersError: action.data
      }
    // Search Designers Reducers -------------end-------------

    // Search Bookings Reducers -------------start-------------
    case GET_BOOKINGS_BY_STATUS_REQUEST:
      return {
        ...state,
        bookingsByStatusRequesting: true
      }

    case GET_BOOKINGS_BY_STATUS_SUCCESS:
      return {
        ...state,
        bookingsByStatusRequesting: false,
        bookingsFilteredData: action.data
      }
    case GET_BOOKINGS_BY_STATUS_FAILURE:
      return {
        ...state,
        bookingsByStatusRequesting: false,
        bookingsSearchError: action.data
      }
    // Search Bookings Reducers -------------end-------------

    // Search Services Reducers -------------start-------------
    case SEARCH_SERVICES_REQUEST:
      return {
        ...state,
        searchServicesRequesting: true
      }

    case SEARCH_SERVICES_SUCCESS:
      return {
        ...state,
        searchServicesRequesting: false,
        servicesFilteredData: action.data
      }
    case SEARCH_SERVICES_FAILURE:
      return {
        ...state,
        searchServicesRequesting: false,
        servicesSearchError: action.data
      }
    // Search Services Reducers -------------end-------------

    default:
      return state
  }
}
