import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  SET_FIREBASE_TOKEN,
  LOGOUT,
  SET_ACCESS_TOKEN,
  POST_FORGOT_PASSWORD_REQUEST,
  POST_FORGOT_PASSWORD_SUCCESS,
  POST_FORGOT_PASSWORD_FAILURE
} from "./type"

const initialState = {
  loginInfo: false,
  error: false,
  requesting: false,
  accessToken: false,
  firebaseToken: false,
  forgotPasswordInfo: false
}

export default (state = initialState, action) => {
  switch (action.type) {

    // POST LOGIN REQUEST

    case POST_LOGIN_REQUEST:
      return {
        ...state,
        requesting: true
      }

    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        requesting: false,
        loginInfo: action.data
      }
    case POST_LOGIN_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data
      }
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken
      }
    case LOGOUT:
      return {
        ...state,
        requesting: false,
        loginInfo: false,
      }

    case SET_FIREBASE_TOKEN:
      return {
        ...state,
        firebaseToken: action.data
      }

    default:
      return state
  }
}
