import { all, call, put, takeLatest } from "redux-saga/effects"
// import AsyncStorage from '@react-native-community/async-storage';

// utils
import XHR from "../../../utils/XHR"
// types
import {
  GET_ONGOING_BOOKINGS_REQUEST,
  GET_UPCOMING_BOOKINGS_REQUEST,
  GET_COMPLETED_BOOKINGS_REQUEST,
} from "./type"

// actions
import {
  ongoingBookingsSuccess,
  ongoingBookingsFailure,
  upcomingBookingsSuccess,
  upcomingBookingsFailure,
  completedBookingsSuccess,
  completedBookingsFailure,
} from "./action"
// import toast from "react-hot-toast"

// ONGOING Bookings API Request
async function getOngoingBookingsAPI(data) {
  const token = localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/all_services/?status=pending`
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

function* getOngoingBookings({ data }) {
  try {
    const response = yield call(getOngoingBookingsAPI, data)
    yield put(ongoingBookingsSuccess(response?.data))
    yield put(ongoingBookingsFailure(false))
  } catch (e) {
    const { response } = e
    yield put(ongoingBookingsFailure(response?.data))
  }
}

// UPCOMING Bookings API Request
async function getUpcomingBookingsAPI(data) {
  const token = localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/all_services/?status=upcoming`
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

function* getUpcomingBookings({ data }) {
  try {
    const response = yield call(getUpcomingBookingsAPI, data)
    yield put(upcomingBookingsSuccess(response?.data))
    yield put(upcomingBookingsFailure(false))
  } catch (e) {
    const { response } = e
    yield put(upcomingBookingsFailure(response?.data))
  }
}

// COMPLETED Bookings API Request
async function getCompletedBookingsAPI(data) {
  const token = localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/all_services/?status=completed`
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

function* getCompletedBookings({ data }) {
  try {
    const response = yield call(getCompletedBookingsAPI, data)
    yield put(completedBookingsSuccess(response?.data))
    yield put(completedBookingsFailure(false))
  } catch (e) {
    const { response } = e
    yield put(completedBookingsFailure(response?.data))
  }
}

export default all([
  takeLatest(GET_ONGOING_BOOKINGS_REQUEST, getOngoingBookings),
  takeLatest(GET_UPCOMING_BOOKINGS_REQUEST, getUpcomingBookings),
  takeLatest(GET_COMPLETED_BOOKINGS_REQUEST, getCompletedBookings),
])
