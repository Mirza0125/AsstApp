import { all, call, put, takeLatest } from "redux-saga/effects"
// import AsyncStorage from '@react-native-community/async-storage';

// utils
import XHR from "../../../utils/XHR"
// types
import {
  EMAIL_SENT_REQUEST,
  GET_PROFILE_REQUEST,
  SEND_EMAIL_AND_PASS_REQUEST,
} from "./type"

// actions
import {
  profileSuccess,
  profileFailure,
  emailSentRequestSuccess,
  emailSentRequestFailure,
} from "./action"

import toast from "react-hot-toast"

async function getProfileAPI(data) {
  const token = localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/designer-profile/${data}/with-reviews/`
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    method: "GET",
  }
  return XHR(URL, options)
}

function* getProfile({ data }) {
  try {
    const response = yield call(getProfileAPI, data)
    yield put(profileSuccess(response?.data))
    yield put(profileFailure(false))
  } catch (e) {
    const { response } = e
    yield put(profileFailure(response?.data))
  }
}

async function emailSentAPI(data) {
  const token = localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/designer-login-details/`
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

function* emailSent({ data }) {
  try {
    const response = yield call(emailSentAPI, data)
    yield put(emailSentRequestSuccess(response?.data))
    toast.success("Email sent successfully")
    yield put(emailSentRequestFailure(false))
  } catch (e) {
    const { response } = e
    yield put(emailSentRequestFailure(response?.data))
  }
}


export default all([
  takeLatest(GET_PROFILE_REQUEST, getProfile),
  takeLatest(EMAIL_SENT_REQUEST, emailSent),
])
