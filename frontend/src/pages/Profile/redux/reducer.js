import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,

  EMAIL_SENT_REQUEST,
  EMAIL_SENT_SUCCESS,
  EMAIL_SENT_FAILURE,
} from "./type"

const initialState = {
  profileData: false,
  emailSentData: false,
  error: false,
  requesting: false,
  emailSentRequesting: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        requesting: true
      }

    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        requesting: false,
        profileData: action.data
      }
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data
      }

    case EMAIL_SENT_REQUEST:
      return {
        ...state,
        emailSentRequesting: true
      }

    case EMAIL_SENT_SUCCESS:
      return {
        ...state,
        emailSentRequesting: false,
        emailSentData: action.data
      }

    case EMAIL_SENT_FAILURE:
      return {
        ...state,
        emailSentRequesting: false,
        error: action.data
      }

    default:
      return state
  }
}
