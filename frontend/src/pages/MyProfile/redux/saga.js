import { all, call, put, takeLatest } from "redux-saga/effects"

// utils
import XHR from "../../../utils/XHR"

// types
import {
  UPDATE_PROFILE_REQUEST,
} from "./type"

// actions
import {
  updateProfileSuccess,
  updateProfileFailure,
} from "./action"

import { loginRequestSuccess } from '../../AuthScreens/Login/redux/action'

// Toast
import toast from "react-hot-toast"

// UPDATE Profile
async function updateConciergeAPI(data) {
  const token = localStorage.getItem("token")
  const idValue = data.id;
  delete data.id;

  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/signup/${idValue}/`
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    method: "PUT",
    data
  }
  return XHR(URL, options)
}

function* updateConcierge({ data }) {
  try {
    const response = yield call(updateConciergeAPI, data)
    yield put(updateProfileSuccess(response?.data))
    yield put(loginRequestSuccess(response?.data))
    yield put(updateProfileFailure(false))
    toast.success("Profile updated successfully!")
  } catch (e) {
    const { response } = e
    yield put(updateProfileFailure(response?.data))
  }
}

export default all([
  takeLatest(UPDATE_PROFILE_REQUEST, updateConcierge),
])
