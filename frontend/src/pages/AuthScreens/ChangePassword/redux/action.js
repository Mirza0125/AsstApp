import {
  POST_CHANGE_PASSWORD,
  POST_CHANGE_PASSWORD_SUCCESS,
  POST_CHANGE_PASSWORD_FAILURE
} from "./type";

export const postChangePassword = (data) => ({
  type: POST_CHANGE_PASSWORD,
  data
})

export const postChangePasswordSuccess = (data) => ({
  type: POST_CHANGE_PASSWORD_SUCCESS,
  data
})

export const postChangePasswordFailure = (data) => ({
  type: POST_CHANGE_PASSWORD_FAILURE,
  data
})