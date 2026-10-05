import { all, call, put, delay, takeLatest } from "redux-saga/effects"

// utils
import XHR from "../../../../utils/XHR"

// types
import {
  POST_LOGIN_REQUEST, SET_FIREBASE_TOKEN,
} from "./type"

// actions
import {
  loginRequestSuccess,
  loginRequestFailure,
  setFirebaseToken

} from "./action"

import { fetchToken } from "../../../../firebase"

// Toast
import toast from "react-hot-toast"
import { history } from "../../../../reduxStore/store"

async function postLoginAPI(data) {
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/login-as-concierge/`
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    data
  }
  return XHR(URL, options)
}

function* postLoginInfo({ data }) {
  try {
    const response = yield call(postLoginAPI, data)
    yield put(loginRequestSuccess(response?.data?.user))
    localStorage.setItem("token", response.data.token)
    history.push('/admin/home')
    // yield put(setAccessToken(response.data.token))
    yield put(loginRequestFailure(false))
    try {
      const token = yield fetchToken()
      yield delay(3000)
      if (token) {
        yield put(
          setFirebaseToken({
            registration_id: token,
            type: "web",
          })
        )
      }
    } catch (e) {
      toast.error(
        "You have blocked your notifications, You will not receive new notifications"
      )
    }
  } catch (e) {
    const { response } = e
    response?.data?.non_field_errors && toast.error(response?.data.non_field_errors, {
      id: "card fields"
    })
    yield put(loginRequestFailure(response?.data))
  }
}
async function postFireTokenAPI(data) {
  const token = await localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/user_fcm_device_add/`
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    method: "POST",
    data
  }
  return XHR(URL, options)
}

function* postFireToken({ data }) {
  try {
    yield call(postFireTokenAPI, data)
  } catch (e) {
    const { response } = e
  }
}


export default all([
  takeLatest(POST_LOGIN_REQUEST, postLoginInfo),
  takeLatest(SET_FIREBASE_TOKEN, postFireToken),
])
