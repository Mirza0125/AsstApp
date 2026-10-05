import { all, call, put, takeLatest } from "redux-saga/effects"

// utils
import XHR from "../../../utils/XHR"

// types
import {
  GET_SERVICES_REQUEST,
} from "./type"

// actions
import {
  servicesRequestSuccess,
  servicesRequestFailure,

} from "./action"

async function getServicesAPI(data) {
  const token = localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/service/`
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

function* getServices({ data }) {
  try {
    const response = yield call(getServicesAPI, data)
    yield put(servicesRequestSuccess(response?.data))
    yield put(servicesRequestFailure(false))
  } catch (e) {
    const { response } = e
    yield put(servicesRequestFailure(response?.data))
  }
}


export default all([
  takeLatest(GET_SERVICES_REQUEST, getServices),
])
