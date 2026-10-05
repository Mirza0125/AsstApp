import { all, call, put, takeLatest } from "redux-saga/effects"
// import { BASE_URL } from "../../../config/app"
import XHR from "../../../utils/XHR"
import {
    getAllUsersDataSuccess,
    getAllUsersDataFailure,
    groupChatPictureSuccess,
    getPubnubChannel,
    getPubnubChannelSuccess,
    getPubnubChannelFailure,
    postPubnubChannelSuccess,
    postPubnubChannelFailure,
    updatePubnubChannelSuccess,
    updatePubnubChannelFailure,
    removePubnubUserSuccess,
    removePubnubUserFailure,
    deletePubnubChannelSuccess,
    deletePubnubChannelFailure,
    setGroupUsers
} from "./action"
import {
    GET_ALL_USERS_USERS,
    POST_GROUP_CHAT_IMAGE,
    GET_PUBNUB_CHANNELS,
    POST_PUBNUB_CHANNELS,
    UPDATE_PUBNUB_CHANNELS,
    REMOVE_PUBNUB_USER,
    DELETE_PUBNUB_USER
} from "./type"

import toast from 'react-hot-toast'

const fetchAllUsersAPI = async data => {
    const URL = `${process.env.REACT_APP_BASE_URL}api/v1/all-users-list/`
    const token = localStorage.getItem("token")
    const options = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        },
        method: "GET"
    }
    return XHR(URL, options)
}

function* fetchAllUsers({ data }) {
    try {
        const response = yield call(fetchAllUsersAPI, data)
        yield put(getAllUsersDataSuccess(response.data))
    } catch (e) {
        const { response } = e
        yield put(getAllUsersDataFailure(response?.data))
    }
}

// const postGroupImageAPI = async data => {
//   const URL = `${BASE_URL}api/v1/group_chat/`
//   const token = localStorage.getItem("token")
//   const options = {
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "multipart/form-data",
//       Authorization: `Token ${token}`
//     },
//     method: "POST",
//     data
//   }
//   return XHR(URL, options)
// }

// function* postGroupImage({ data }) {
//   try {
//     const response = yield call(postGroupImageAPI, data)
//     yield put(groupChatPictureSuccess(response.data))
//   } catch (e) {
//     const { response } = e
//   }
// }

// const getAllChannelsAPI = async data => {
//   const URL = `${BASE_URL}api/v1/pubnub_chat/?owner_name=${data.owner}&group_name=${data.group}`
//   const token = localStorage.getItem("token")
//   const options = {
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Token ${token}`
//     },
//     method: "GET"
//   }
//   return XHR(URL, options)
// }

// function* getAllChannels({ data }) {
//   try {
//     const response = yield call(getAllChannelsAPI, data)
//     yield put(getPubnubChannelSuccess(response.data))
//   } catch (e) {
//     const { response } = e
//     yield put(getPubnubChannelFailure(response?.data))
//   }
// }

// const postChatChannelAPI = async data => {
//   const URL = `${BASE_URL}api/v1/pubnub_chat/`
//   const token = localStorage.getItem("token")
//   const options = {
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Token ${token}`
//     },
//     method: "POST",
//     data
//   }
//   return XHR(URL, options)
// }

// function* postChatChannel({ data }) {
//   try {
//     const response = yield call(postChatChannelAPI, data)
//     yield put(postPubnubChannelSuccess(response.data))
//     yield put(getPubnubChannel({ owner: "", group: "" }))
//   } catch (e) {
//     const { response } = e
//     yield put(postPubnubChannelFailure(response.data))
//     toast.error(response.data?.msg, {
//       id: "card fields"
//     })
//   }
// }

// const updateChatChannelAPI = async data => {
//   const URL = `${BASE_URL}api/v1/pubnub_chat/`
//   const token = localStorage.getItem("token")
//   const options = {
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Token ${token}`
//     },
//     method: "PATCH",
//     data
//   }
//   return XHR(URL, options)
// }

// function* updateChatChannel({ data }) {
//   try {
//     const response = yield call(updateChatChannelAPI, data)
//     yield put(updatePubnubChannelSuccess(response.data))
//   } catch (e) {
//     const { response } = e
//     yield put(updatePubnubChannelFailure(response.data))
//   }
// }

// const removeChatUserAPI = async data => {
//   const URL = `${BASE_URL}api/v1/pubnub_chat/${data.id}/`
//   const token = localStorage.getItem("token")
//   const options = {
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Token ${token}`
//     },
//     method: "PATCH",
//     data: data.data
//   }
//   return XHR(URL, options)
// }

// function* removeChatUser({ data }) {
//   try {
//     const response = yield call(removeChatUserAPI, data)
//     yield put(removePubnubUserSuccess(response.data))
//     yield put(getPubnubChannel({ owner: "", group: "" }))
//     yield put(setGroupUsers([]))
//   } catch (e) {
//     const { response } = e
//     yield put(removePubnubUserFailure(response.data))
//   }
// }

// const deleteChatChannelAPI = async data => {
//   const URL = `${BASE_URL}api/v1/pubnub_chat/${data}/`
//   const token = localStorage.getItem("token")
//   const options = {
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Token ${token}`
//     },
//     method: "DELETE",
//     data
//   }
//   return XHR(URL, options)
// }

// function* deleteChatChannel({ data }) {
//   try {
//     const response = yield call(deleteChatChannelAPI, data)
//     yield put(deletePubnubChannelSuccess(response.data))
//     yield put(getPubnubChannel({ owner: "", group: "" }))
//   } catch (e) {
//     const { response } = e
//     yield put(deletePubnubChannelFailure(response.data))
//   }
// }

export default all([
    takeLatest(GET_ALL_USERS_USERS, fetchAllUsers),
    //   takeLatest(POST_GROUP_CHAT_IMAGE, postGroupImage),
    //   takeLatest(GET_PUBNUB_CHANNELS, getAllChannels),
    //   takeLatest(POST_PUBNUB_CHANNELS, postChatChannel),
    //   takeLatest(UPDATE_PUBNUB_CHANNELS, updateChatChannel),
    //   takeLatest(REMOVE_PUBNUB_USER, removeChatUser),
    //   takeLatest(DELETE_PUBNUB_USER, deleteChatChannel)
])
