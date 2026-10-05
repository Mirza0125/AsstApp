import { all, call, put, takeLatest } from "redux-saga/effects"
// import AsyncStorage from '@react-native-community/async-storage';

// utils
import XHR from "../../../utils/XHR"
// types
import {
  GET_RESIDENTS_REQUEST,
  DELETE_RESIDENTS_REQUEST,
} from "./type"

// actions
import {
  residentsSuccess,
  residentsFailure,
  deleteResidentsSuccess,
  deleteResidentsFailure,
  residentsRequest
} from "./action"

import toast from "react-hot-toast"

// GET Residents API
async function getResidentsAPI(data) {
  const token = localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/residents-list/`
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

function* getResidents({ data }) {
  try {
    const response = yield call(getResidentsAPI, data)
    yield put(residentsSuccess(response?.data))
    yield put(residentsFailure(false))
  } catch (e) {
    const { response } = e
    yield put(residentsFailure(response?.data))
  }
}

// DELETE Residents API
async function deleteResidentsAPI(data) {
  const token = localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/residents-list/${data}/`
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

function* deleteResidents({ data }) {
  try {
    const response = yield call(deleteResidentsAPI, data)
    yield put(deleteResidentsSuccess(response?.data))
    toast.success("Resident removed successfully")
    yield put(residentsRequest())
    yield put(deleteResidentsFailure(false))
  } catch (e) {
    const { response } = e
    response?.data?.error && toast.error(response?.data.error)
    yield put(deleteResidentsFailure(response?.data))
  }
}


export default all([
  takeLatest(GET_RESIDENTS_REQUEST, getResidents),
  takeLatest(DELETE_RESIDENTS_REQUEST, deleteResidents),
])
