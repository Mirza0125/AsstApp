import { all, call, put, takeLatest } from "redux-saga/effects"
// import AsyncStorage from '@react-native-community/async-storage';

// utils
import XHR from "../../../utils/XHR"
// types
import {
  GET_DESIGNERS_REQUEST,
  DELETE_DESIGNERS_REQUEST,
} from "./type"

// actions
import {
  designersSuccess,
  designersFailure,
  deleteDesignersSuccess,
  deleteDesignersFailure,
  designersRequest,
} from "./action"

import toast from "react-hot-toast"

async function getDesignersAPI(data) {
  const token = localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/designer-profile/`
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

function* getDesigners({ data }) {
  try {
    const response = yield call(getDesignersAPI, data)
    yield put(designersSuccess(response?.data))
    yield put(designersFailure(false))
  } catch (e) {
    const { response } = e
    yield put(designersFailure(response?.data))
  }
}

async function deleteDesignersAPI(data) {
  const token = localStorage.getItem("token")
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/designer-profile/${data}/`
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

function* deleteDesigners({ data }) {
  try {
    const response = yield call(deleteDesignersAPI, data)
    yield put(deleteDesignersSuccess(response?.data))
    toast.success("Designer removed successfully")
    yield put(designersRequest())
    yield put(deleteDesignersFailure(false))
  } catch (e) {
    const { response } = e
    yield put(deleteDesignersFailure(response?.data))
  }
}

export default all([
  takeLatest(GET_DESIGNERS_REQUEST, getDesigners),
  takeLatest(DELETE_DESIGNERS_REQUEST, deleteDesigners),
])
