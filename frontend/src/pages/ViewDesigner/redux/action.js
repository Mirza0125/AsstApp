import {
  GET_DESIGNERS_REQUEST,
  GET_DESIGNERS_SUCCESS,
  GET_DESIGNERS_FAILURE,
  DELETE_DESIGNERS_REQUEST,
  DELETE_DESIGNERS_SUCCESS,
  DELETE_DESIGNERS_FAILURE
} from "./type"

// GET Designers
export const designersRequest = () => ({
  type: GET_DESIGNERS_REQUEST,
})

export const designersSuccess = data => ({
  type: GET_DESIGNERS_SUCCESS,
  data
})

export const designersFailure = data => ({
  type: GET_DESIGNERS_FAILURE,
  data
})

// DELETE Designers
export const deleteDesignersRequest = data => ({
  type: DELETE_DESIGNERS_REQUEST,
  data
})

export const deleteDesignersSuccess = data => ({
  type: DELETE_DESIGNERS_SUCCESS,
  data
})

export const deleteDesignersFailure = data => ({
  type: DELETE_DESIGNERS_FAILURE,
  data
})
