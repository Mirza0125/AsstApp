import { all, call, put, takeLatest, delay } from "redux-saga/effects"
// import AsyncStorage from '@react-native-community/async-storage';

// utils
import XHR from "../../../utils/XHR"
// types
import {
  CANCEL_BOOKING_REQUEST,
  GET_BOOKINGS_REQUEST,
  GET_TIME_SLOT_REQUEST,
  UPDATE_TIME_SLOTS_REQUEST,
} from "./type"

// actions
import {
  bookingsSuccess,
  bookingsFailure,
  cancelBookingSuccess,
  cancelBookingFailure,
  bookingsRequest,
  getTimeSlotSuccess,
  getTimeSlotFailure,
  updateTimeSlotSuccess,
  updateTimeSlotFailure,
} from "./action"

import toast from "react-hot-toast"

async function getBookingsAPI(data) {
  const token = localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/calendar_events/?booking_date=${data.booking_date}`
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

function* getBookings({ data }) {
  try {
    const response = yield call(getBookingsAPI, data)
    yield put(bookingsSuccess(response?.data))
    yield put(bookingsFailure(false))
  } catch (e) {
    const { response } = e
    yield put(bookingsFailure(response?.data))
  }
}

// Cancel Booking API
async function cancelBookingAPI(booking_id) {
  const token = localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/calendar_events/${booking_id}/cancel_booking/`
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

function* cancelBooking({ booking_id }) {
  try {
    const response = yield call(cancelBookingAPI, booking_id)
    toast.success("Booking cancelled successfully")
    const data = {"booking_date": localStorage.getItem("booking_date")}
    yield put(bookingsRequest(data))
    yield put(cancelBookingSuccess(response?.data))
  } catch (e) {
    const { response } = e
    yield put(cancelBookingFailure(response?.data))
  }
}

// GET Time Slots API
async function getTimeSlotsAPI(data) {
  const token = localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/available-time-slots/?service_id=${data.category_id}&booking_service_id=${data.booking_service_id}`
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

function* getTimeSlots({ data }) {
  try {
    const response = yield call(getTimeSlotsAPI, data)
    yield delay(500)
    yield put(getTimeSlotSuccess(response?.data))
    yield put(getTimeSlotFailure(false))
  } catch (e) {
    const { response } = e
    yield put(getTimeSlotFailure(response?.data))
  }
}

// UPDATE Time Slots of Booking Service API
async function updateTimeSlotsAPI(data) {
  const token = localStorage.getItem("token")
  const bookingServiceID = data.booking_service_id;
  delete data.booking_service_id;

  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/booking_service/${bookingServiceID}/`
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    method: "PATCH",
    data
  }
  return XHR(URL, options)
}

function* updateTimeSlots({ data }) {
  try {
    const response = yield call(updateTimeSlotsAPI, data)
    yield put(updateTimeSlotSuccess(response?.data))
    yield put(bookingsRequest({"booking_date": localStorage.getItem("booking_date")}))
    toast.success("Time Slot successfully added")
  } catch (e) {
    const { response } = e
    yield put(updateTimeSlotFailure(response?.data))
  }
}

export default all([
  takeLatest(GET_BOOKINGS_REQUEST, getBookings),
  takeLatest(CANCEL_BOOKING_REQUEST, cancelBooking),
  takeLatest(GET_TIME_SLOT_REQUEST, getTimeSlots),
  takeLatest(UPDATE_TIME_SLOTS_REQUEST, updateTimeSlots)
])
