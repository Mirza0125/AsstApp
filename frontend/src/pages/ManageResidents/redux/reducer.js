import {
  // GET Residents Type
  GET_RESIDENTS_REQUEST,
  GET_RESIDENTS_SUCCESS,
  GET_RESIDENTS_FAILURE,
  // DELETE Residents Type
  DELETE_RESIDENTS_REQUEST,
  DELETE_RESIDENTS_SUCCESS,
  DELETE_RESIDENTS_FAILURE,
} from "./type"

const initialState = {
  residents: false,
  error: false,
  requesting: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    // GET Residents Reducer
    case GET_RESIDENTS_REQUEST:
      return {
        ...state,
        requesting: true
      }

    case GET_RESIDENTS_SUCCESS:
      return {
        ...state,
        requesting: false,
        residents: action.data
      }
    case GET_RESIDENTS_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data
      }

    // DELETE Resident Reducer
    case DELETE_RESIDENTS_REQUEST:
      return {
        ...state,
        deleteResidentRequesting: true,
      }

    case DELETE_RESIDENTS_SUCCESS:
      return {
        ...state,
        deleteResidentRequesting: false,
      }
    case DELETE_RESIDENTS_FAILURE:
      return {
        ...state,
        deleteResidentRequesting: false,
        error: action.data
      }
  
    default:
      return state
  }
}
