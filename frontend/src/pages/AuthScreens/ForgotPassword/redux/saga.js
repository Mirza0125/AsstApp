import { all, call, put, takeLatest } from "redux-saga/effects"

// utils
import XHR from "../../../../utils/XHR"

// types
import {
  POST_FORGOT_PASSWORD_REQUEST,
} from "./type"

import { history } from '../../../../reduxStore/store';

// actions
import {
  forgotPasswordRequestFailure,
  forgotPasswordRequestSuccess
} from "./action"

import toast from 'react-hot-toast'

async function postForgotAPI(data) {
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/forgot-password/`
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

function* postForgotInfoRequest({ data }) {
  try {
    const response = yield call(postForgotAPI, data)
    yield put(forgotPasswordRequestSuccess(response?.data))
    history.push("/auth/change-password")
    if (response?.status === 200) {
      toast.success("Email Sent Successfully")
    }
  } catch (e) {
    const { response } = e
    yield put(forgotPasswordRequestFailure(response?.data))
  }
}


export default all([
  takeLatest(POST_FORGOT_PASSWORD_REQUEST, postForgotInfoRequest),
])
