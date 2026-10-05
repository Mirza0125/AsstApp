import {
  POST_CHANGE_PASSWORD,
  POST_CHANGE_PASSWORD_SUCCESS,
  POST_CHANGE_PASSWORD_FAILURE
} from "./type"

const initialState = {
  changePasswordInfo: false,
  requesting: false,
  error: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_CHANGE_PASSWORD:
      return {
        ...state,
        requesting: true,
        error: false
      }
    case POST_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        requesting: false,
        confirmInfo: action.data
      }
    case POST_CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data
      }
    default:
      return state
  }
}
