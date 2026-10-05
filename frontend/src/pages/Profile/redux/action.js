import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  
  EMAIL_SENT_REQUEST,
  EMAIL_SENT_SUCCESS,
  EMAIL_SENT_FAILURE,
} from "./type"

// POST_PAYMENT_INFORMATION
export const profileRequest = (data) => ({
  type: GET_PROFILE_REQUEST,
  data
})

export const profileSuccess = data => ({
  type: GET_PROFILE_SUCCESS,
  data
})

export const profileFailure = data => ({
  type: GET_PROFILE_FAILURE,
  data
})

export const emailSentRequest = (data) => ({
  type: EMAIL_SENT_REQUEST,
  data
})

export const emailSentRequestSuccess = data => ({
  type: EMAIL_SENT_SUCCESS,
  data
})

export const emailSentRequestFailure = data => ({
  type: EMAIL_SENT_FAILURE,
  data
})
