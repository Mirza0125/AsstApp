import {
  POST_FORGOT_PASSWORD_FAILURE,
  POST_FORGOT_PASSWORD_REQUEST,
  POST_FORGOT_PASSWORD_SUCCESS
} from "./type"

const initialState = {
  forgotPasswordInfo: false,
  error: false,
  requesting: false
}

export default (state = initialState, action) => {
  switch (action.type) {

    // POST FORGOT PASSWORD REQUEST

    case POST_FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        requesting: true
      }

    case POST_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        requesting: false,
        forgotPasswordInfo: action.data
      }
    case POST_FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data
      }

    default:
      return state
  }
}
