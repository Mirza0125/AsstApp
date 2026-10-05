import { all, call, put, takeLatest } from "redux-saga/effects"

// utils
import XHR from "../../../utils/XHR"

// Routing
import { history } from '../../../reduxStore/store'

// types
import {
  POST_DESIGNER_REQUEST,
} from "./type"

// actions
import {
  postDesignerSuccess,
  postDesignerFailure,

} from "./action"

// POST Deisgner API
async function postDesignerAPI(data) {
  const URL = `${process.env.REACT_APP_BASE_URL}api/v1/add-designer/`
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

function* postDesignerInfo({ data }) {
  try {
    const response = yield call(postDesignerAPI, data)
    yield put(postDesignerSuccess(response?.data))
    history.push("/admin/home-designers-list")
    yield put(postDesignerFailure(false))
  } catch (e) {
    const { response } = e
    yield put(postDesignerFailure(response?.data))
  }
}

export default all([
  takeLatest(POST_DESIGNER_REQUEST, postDesignerInfo),
])
