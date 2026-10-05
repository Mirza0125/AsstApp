import {
  POST_SERVICE_REQUEST,
  POST_SERVICE_SUCCESS,
  POST_SERVICE_FAILURE,
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAILURE,
  PREV_DATA,
  SET_SUCCESS
} from "./type"

const initialState = {
  servicesInfo: false,
  updateServices: false,
  prevData: { data: {}, isEdit: false },
  setSuccess: {success: false},
  error: false,
  requesting: false,
  updateRequesting: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_SERVICE_REQUEST:
      return {
        ...state,
        requesting: true
      }

    case POST_SERVICE_SUCCESS:
      return {
        ...state,
        requesting: false,
        servicesInfo: action.data
      }
    case POST_SERVICE_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data
      }

    // Update Service
    case UPDATE_SERVICE_REQUEST:
      return {
        ...state,
        updateRequesting: true
      }

    case UPDATE_SERVICE_SUCCESS:
      return {
        ...state,
        updateRequesting: false,
        updateServices: action.data
      }
    case UPDATE_SERVICE_FAILURE:
      return {
        ...state,
        updateRequesting: false,
        error: action.data
      }  
    
    case PREV_DATA:
      return {
        ...state,
        prevData: action.data,
      }

    case SET_SUCCESS:
      return {
        ...state,
        setSuccess: action.data
      }

    default:
      return state
  }
}
