import {
  GET_SERVICES_REQUEST,
  GET_SERVICES_SUCCESS,
  GET_SERVICES_FAILURE,
} from "./type"

const initialState = {
  services: false,
  error: false,
  requesting: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICES_REQUEST:
      return {
        ...state,
        requesting: true
      }

    case GET_SERVICES_SUCCESS:
      return {
        ...state,
        requesting: false,
        services: action.data
      }
    case GET_SERVICES_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data
      }

    default:
      return state
  }
}
