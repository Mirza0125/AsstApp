import {
  POST_SERVICE_REQUEST,
  POST_SERVICE_SUCCESS,
  POST_SERVICE_FAILURE,
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAILURE,
  PREV_DATA,
  SET_SUCCESS,
} from "./type"

// POST Service Actions
export const postServiceRequest = data => ({
  type: POST_SERVICE_REQUEST,
  data
})

export const postServiceSuccess = data => ({
  type: POST_SERVICE_SUCCESS,
  data
})

export const postServiceFailure = data => ({
  type: POST_SERVICE_FAILURE,
  data
})

// UPDATE Service
export const updateServiceRequest = data => ({
  type: UPDATE_SERVICE_REQUEST,
  data
})

export const updateServiceSuccess = data => ({
  type: UPDATE_SERVICE_SUCCESS,
  data
})

export const updateServiceFailure = data => ({
  type: UPDATE_SERVICE_FAILURE,
  data
})

export const prevDataAction = data => ({
  type: PREV_DATA,
  data
})

export const setSuccessAction = data => ({
  type: SET_SUCCESS,
  data
})
