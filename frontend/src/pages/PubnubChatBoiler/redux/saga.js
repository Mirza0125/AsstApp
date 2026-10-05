import { all, call, put, takeLatest } from "redux-saga/effects"

// utils
import XHR from "../../../utils/XHR"
// types
import {
  GET_USERS_LIST_REQUEST
} from "./type"

// actions
import {
  getUsersListFailure,
  getUsersListSuccess
} from "./action"

// GET USERS LIST API
async function getUsersAPI(data) {
  const token = localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/all-users-list/`
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

function* getUsersList({ data }) {
  try {
    const response = yield call(getUsersAPI, data)
    yield put(getUsersListSuccess(response?.data))
    yield put(getUsersListFailure(false))
  } catch (e) {
    const { response } = e
    yield put(getUsersListFailure(response?.data))
  }
}


export default all([
  takeLatest(GET_USERS_LIST_REQUEST, getUsersList),
])
