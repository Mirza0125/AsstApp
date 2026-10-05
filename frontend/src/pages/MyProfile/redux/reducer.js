import { 
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
} from './type'

const initialState = {
  conciergeProfile: false,
  error: false,
  requesting: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        requesting: true
      }

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        requesting: false,
        conciergeProfile: action.data
      }

    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data
      }

    default:
      return state
  }
}
