import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  LOGOUT,
  SET_FIREBASE_TOKEN,
  SET_ACCESS_TOKEN
} from "./type"

// POST LOGIN
export const loginRequest = data => ({
  type: POST_LOGIN_REQUEST,
  data
})

export const loginRequestSuccess = data => ({
  type: POST_LOGIN_SUCCESS,
  data
})

export const loginRequestFailure = data => ({
  type: POST_LOGIN_FAILURE,
  data
})

export const setFirebaseToken = data => ({
  type: SET_FIREBASE_TOKEN,
  data
})
export const setAccessToken = accessToken => ({
  type: SET_ACCESS_TOKEN,
  accessToken
})

export const logOut = () => ({
  type: LOGOUT,
})
