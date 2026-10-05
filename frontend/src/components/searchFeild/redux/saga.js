import { all, call, put, takeLatest } from "redux-saga/effects"
// import AsyncStorage from '@react-native-community/async-storage';

// utils
import XHR from "../../../utils/XHR"

// types
import {
  SEARCH_DESIGNERS_REQUEST,
  SEARCH_RESIDENTS_REQUEST,
  GET_BOOKINGS_BY_STATUS_REQUEST,
  SEARCH_SERVICES_REQUEST,
} from "./type"

// actions
import {
  searchResidentsSuccess,
  searchResidentsFailure,
  searchDesignersSuccess,
  searchDesignersFailure,
  getBookingsbyStatusSuccess,
  getBookingsbyStatusFailure,
  searchServicesSuccess,
  searchServicesFailure,
} from "./action"

import { 
  residentsSuccess,
} from '../../../pages/ManageResidents/redux/action'

import { 
  designersSuccess,
} from '../../../pages/ViewDesigner/redux/action'

import {
  ongoingBookingsSuccess,
  upcomingBookingsSuccess,
  completedBookingsSuccess,
} from '../../../pages/ManageBookings/redux/action'

import { servicesRequestSuccess } from '../../../pages/ManageServices/redux/action'

// import toast from "react-hot-toast"

// Search Residents API --------------start--------------
async function searchResidentsAPI(data) {
  const token = localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/residents-list/?search=${data}`
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

function* searchResidents({ data }) {
  try {
    const response = yield call(searchResidentsAPI, data)
    yield put(searchResidentsSuccess(response?.data))
    yield put(residentsSuccess(response?.data))
    yield put(searchResidentsFailure(false))
  } catch (e) {
    const { response } = e
    yield put(searchResidentsFailure(response?.data))
  }
}
// Search Residents API --------------end--------------

// Search Designers API --------------start--------------
async function searchDesignersAPI(data) {
  const token = localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/designer-profile/?search=${data}`
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

function* searchDesigners({ data }) {
  try {
    const response = yield call(searchDesignersAPI, data)
    yield put(searchDesignersSuccess(response?.data))
    yield put(designersSuccess(response?.data))
    yield put(searchDesignersFailure(false))
  } catch (e) {
    const { response } = e
    yield put(searchDesignersFailure(response?.data))
  }
}
// Search Designers API --------------end--------------

// Search Bookings API --------------start--------------
async function searchBookingsAPI(data) {
  const token = localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/all_services/?status=${data.status}&search=${data.search_value}`
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

function* searchBookings({ data }) {
  console.log({"data.status": data.status, "data.search_value": data.search_value})
  try {
    const response = yield call(searchBookingsAPI, data)
    yield put(getBookingsbyStatusSuccess(response?.data))
    if (data.status === 'pending') {yield put(ongoingBookingsSuccess(response?.data))}
    if (data.status === 'upcoming') {yield put(upcomingBookingsSuccess(response?.data))}
    if (data.status === 'completed') {yield put(completedBookingsSuccess(response?.data))}
    yield put(getBookingsbyStatusFailure(false))
  } catch (e) {
    const { response } = e
    yield put(getBookingsbyStatusFailure(response?.data))
  }
}
// Search Bookings API --------------end--------------

// Search Services API --------------start--------------
async function searchServicesAPI(data) {
  const token = localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/service/?search=${data}`
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

function* searchServices({ data }) {
  try {
    const response = yield call(searchServicesAPI, data)
    yield put(searchServicesSuccess(response?.data))
    yield put(servicesRequestSuccess(response?.data))
    yield put(searchServicesFailure(false))
  } catch (e) {
    const { response } = e
    yield put(searchServicesFailure(response?.data))
  }
}
// Search Services API --------------end--------------

export default all([
  takeLatest(SEARCH_RESIDENTS_REQUEST, searchResidents),
  takeLatest(SEARCH_DESIGNERS_REQUEST, searchDesigners),
  takeLatest(GET_BOOKINGS_BY_STATUS_REQUEST, searchBookings),
  takeLatest(SEARCH_SERVICES_REQUEST, searchServices),
])
