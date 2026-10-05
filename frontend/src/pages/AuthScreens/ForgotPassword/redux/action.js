import {
  POST_FORGOT_PASSWORD_FAILURE,
  POST_FORGOT_PASSWORD_REQUEST,
  POST_FORGOT_PASSWORD_SUCCESS
} from "./type"


export const forgotPasswordRequest = data => ({
  type: POST_FORGOT_PASSWORD_REQUEST,
  data
})

export const forgotPasswordRequestSuccess = data => ({
  type: POST_FORGOT_PASSWORD_SUCCESS,
  data
})

export const forgotPasswordRequestFailure = data => ({
  type: POST_FORGOT_PASSWORD_FAILURE,
  data
})
