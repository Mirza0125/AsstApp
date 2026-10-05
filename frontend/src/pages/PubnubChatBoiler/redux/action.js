import {
  GET_USERS_LIST_FAILURE,
  GET_USERS_LIST_REQUEST,
  GET_USERS_LIST_SUCCESS
} from "./type"

// GET USERS LIST ACTIONS
export const getUsersListRequest = () => ({
  type: GET_USERS_LIST_REQUEST,
})

export const getUsersListSuccess = data => ({
  type: GET_USERS_LIST_SUCCESS,
  data
})

export const getUsersListFailure = data => ({
  type: GET_USERS_LIST_FAILURE,
  data
})