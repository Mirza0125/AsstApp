import {
  GET_ALL_USERS_USERS,
  GET_ALL_USERS_USERS_FAILURE,
  GET_ALL_USERS_USERS_SUCCESS,
  SET_DIRECT_USERS,
  SET_GROUP_USERS,
  POST_GROUP_CHAT_IMAGE,
  POST_GROUP_CHAT_IMAGE_SUCCESS,
  GET_PUBNUB_CHANNELS,
  GET_PUBNUB_CHANNELS_SUCCESS,
  GET_PUBNUB_CHANNELS_FAILURE,
  POST_PUBNUB_CHANNELS,
  POST_PUBNUB_CHANNELS_SUCCESS,
  POST_PUBNUB_CHANNELS_FAILURE,
  UPDATE_PUBNUB_CHANNELS,
  UPDATE_PUBNUB_CHANNELS_SUCCESS,
  UPDATE_PUBNUB_CHANNELS_FAILURE,
  REMOVE_PUBNUB_USER,
  REMOVE_PUBNUB_USER_SUCCESS,
  REMOVE_PUBNUB_USER_FAILURE,
  DELETE_PUBNUB_USER,
  DELETE_PUBNUB_USER_SUCCESS,
  DELETE_PUBNUB_USER_FAILURE,
  SEARCH_LIST_SHOW
} from "./type"

export const getAllUsersData = data => ({
  type: GET_ALL_USERS_USERS,
  data
})

export const getAllUsersDataSuccess = data => ({
  type: GET_ALL_USERS_USERS_SUCCESS,
  data
})

export const getAllUsersDataFailure = data => ({
  type: GET_ALL_USERS_USERS_FAILURE,
  data
})

export const setDirectUser = data => ({
  type: SET_DIRECT_USERS,
  data
})

export const setGroupUsers = data => ({
  type: SET_GROUP_USERS,
  data
})

export const setGroupChatPicture = data => ({
  type: POST_GROUP_CHAT_IMAGE,
  data
})

export const groupChatPictureSuccess = data => ({
  type: POST_GROUP_CHAT_IMAGE_SUCCESS,
  data
})

export const getPubnubChannel = data => ({
  type: GET_PUBNUB_CHANNELS,
  data
})

export const getPubnubChannelSuccess = data => ({
  type: GET_PUBNUB_CHANNELS_SUCCESS,
  data
})

export const getPubnubChannelFailure = data => ({
  type: GET_PUBNUB_CHANNELS_FAILURE,
  data
})

export const postPubnubChannel = data => ({
  type: POST_PUBNUB_CHANNELS,

  data
})

export const postPubnubChannelSuccess = data => ({
  type: POST_PUBNUB_CHANNELS_SUCCESS,
  data
})

export const postPubnubChannelFailure = data => ({
  type: POST_PUBNUB_CHANNELS_FAILURE,
  data
})

export const updatePubnubChannel = data => ({
  type: UPDATE_PUBNUB_CHANNELS,
  data
})

export const updatePubnubChannelSuccess = data => ({
  type: UPDATE_PUBNUB_CHANNELS_SUCCESS,
  data
})

export const updatePubnubChannelFailure = data => ({
  type: UPDATE_PUBNUB_CHANNELS_FAILURE,
  data
})

export const removePubnubUser = data => ({
  type: REMOVE_PUBNUB_USER,
  data
})

export const removePubnubUserSuccess = data => ({
  type: REMOVE_PUBNUB_USER_SUCCESS,
  data
})

export const removePubnubUserFailure = data => ({
  type: REMOVE_PUBNUB_USER_FAILURE,
  data
})

export const deletePubnubChannel = data => ({
  type: DELETE_PUBNUB_USER,
  data
})

export const deletePubnubChannelSuccess = data => ({
  type: DELETE_PUBNUB_USER_SUCCESS,
  data
})

export const deletePubnubChannelFailure = data => ({
  type: DELETE_PUBNUB_USER_FAILURE,
  data
})

export const searchListShow = data => ({
  type: SEARCH_LIST_SHOW,
  data
})
