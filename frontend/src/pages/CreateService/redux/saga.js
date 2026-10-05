import { all, call, put, takeLatest } from "redux-saga/effects"
// import AsyncStorage from '@react-native-community/async-storage';

// utils
import XHR from "../../../utils/XHR"

// Routing
import { history } from '../../../reduxStore/store'

// types
import {
  POST_SERVICE_REQUEST,
  UPDATE_SERVICE_REQUEST,
} from "./type"

// actions
import {
  postServiceSuccess,
  postServiceFailure,
  updateServiceSuccess,
  updateServiceFailure,
} from "./action"

// Toast
import toast from "react-hot-toast"

// POST Service
async function postServiceAPI(data) {
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/service/`
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

function* postServiceInfo({ data }) {
  try {
    const response = yield call(postServiceAPI, data)
    yield put(postServiceSuccess(response?.data))
    toast.success("Service created successfully")
    history.goBack()
    yield put(postServiceFailure(false))
  } catch (e) {
    const { response } = e
    response?.data?.non_field_errors && toast.error(response?.data.non_field_errors, {
      id: "card fields"
    })
    yield put(postServiceFailure(response?.data))
  }
}

// UPDATE Service
async function updateServicesAPI(data) {
  const token = localStorage.getItem("token")
  // const oldData = data
  const idValue = data.id;
  delete data.id;

  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/service/${idValue}/`
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

function* updateServices({ data }) {
  try {
    const response = yield call(updateServicesAPI, data)
    yield put(updateServiceSuccess(response?.data))
    yield put(updateServiceFailure(false))
    toast.success("Service Edited Successfully!")
    history.goBack()
  } catch (e) {
    const { response } = e
    yield put(updateServiceFailure(response?.data))
  }
}

export default all([
  takeLatest(POST_SERVICE_REQUEST, postServiceInfo),
  takeLatest(UPDATE_SERVICE_REQUEST, updateServices),
])
