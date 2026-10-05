import { all, call, put, takeLatest } from "redux-saga/effects"

// utils
import XHR from "../../../utils/XHR"
// types
import {
  DELETE_NOTIFICATION_REQUEST,
  GET_NOTIFICATION,
  POST_MARK_READ,
} from "./type"

// actions
import {
  getNotificationListSuccess,
  getNotificationListFailure,
  postMarkReadNotificationSuccess,
  postMarkReadNotificationFailure,
  getNotificationList,
  deleteNotificationSuccess,
  deleteNotificationFailure,
} from "./action"
import toast from "react-hot-toast"

// GET Notifications API Request
async function getNotificationAPI() {
  const token = localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/notification/`
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

function* getNotificationRequest({ data }) {
  try {
    const response = yield call(getNotificationAPI, data)
    yield put(getNotificationListSuccess(response?.data))
    // yield put(getNotificationListFailure(false))
  } catch (e) {
    const { response } = e
    yield put(getNotificationListFailure(response?.data))
  }
}

// Post MarkRead 
async function postMarkReadAPI(data) {
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/user-notification/`
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`
    },
    method: "POST",
    data
  }
  return XHR(URL, options)
}

function* postMarkReadRequest({ data }) {
  try {
    const response = yield call(postMarkReadAPI, data)
    yield put(postMarkReadNotificationSuccess(response?.data))
    yield put(getNotificationList())
    yield put(postMarkReadNotificationFailure(false))
  } catch (e) {
    const { response } = e
    response?.data?.non_field_errors && toast.error(response?.data.non_field_errors, {
      id: "card fields"
    })
    yield put(postMarkReadNotificationFailure(response?.data))
  }
}

// Delete Notification

async function deleteNotificationAPI(data) {
  const token = localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/notification/${data}/`
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    method: "DELETE",
  }
  return XHR(URL, options)
}

function* deleteNotifications({ data }) {
  try {
    const response = yield call(deleteNotificationAPI, data)
    yield put(deleteNotificationSuccess(response?.data))
    yield put(getNotificationList())
    yield put(deleteNotificationFailure(false))
  } catch (e) {
    const { response } = e
    yield put(deleteNotificationFailure(response?.data))
  }
}

export default all([
  takeLatest(GET_NOTIFICATION, getNotificationRequest),
  takeLatest(POST_MARK_READ, postMarkReadRequest),
  takeLatest(DELETE_NOTIFICATION_REQUEST, deleteNotifications),
])
