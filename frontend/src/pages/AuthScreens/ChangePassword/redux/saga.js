import { all, call, put, takeLatest } from "redux-saga/effects"

// utils
import XHR from "../../../../utils/XHR"

import { POST_CHANGE_PASSWORD } from "./type";
import {
  postChangePasswordSuccess,
  postChangePasswordFailure
} from "./action";
import { history } from "../../../../reduxStore/store";

import toast from "react-hot-toast"

async function postChangePasswordAPI(data) {
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/reset-password-confirm/`
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

function* postChangePasswordRequest({ data }) {
  try {
    const response = yield call(postChangePasswordAPI, data)
    yield put(postChangePasswordSuccess(response.data))
    history.push('/auth/login')
    if (response?.status === 200) {
      toast.success("Password Changed")
    }
  } catch (e) {
    const { response } = e
    yield put(postChangePasswordFailure(response.data))
    if (response.status == 404) {
      yield put(postChangePasswordFailure({ token: "Invalid token" }))
    }
  }
}

export default all([
  takeLatest(POST_CHANGE_PASSWORD, postChangePasswordRequest)
])