import {
  // GET Residents Type
  GET_RESIDENTS_REQUEST,
  GET_RESIDENTS_SUCCESS,
  GET_RESIDENTS_FAILURE,
  // DELETE Residents Type
  DELETE_RESIDENTS_REQUEST,
  DELETE_RESIDENTS_SUCCESS,
  DELETE_RESIDENTS_FAILURE,
} from "./type"

// GET Residents Actions
export const residentsRequest = () => ({
  type: GET_RESIDENTS_REQUEST,
})

export const residentsSuccess = data => ({
  type: GET_RESIDENTS_SUCCESS,
  data
})

export const residentsFailure = data => ({
  type: GET_RESIDENTS_FAILURE,
  data
})

// DELETE Resident Actions
export const deleteResidentsRequest = data => ({
  type: DELETE_RESIDENTS_REQUEST,
  data
})

export const deleteResidentsSuccess = data => ({
  type: DELETE_RESIDENTS_SUCCESS,
  data
})

export const deleteResidentsFailure = data => ({
  type: DELETE_RESIDENTS_FAILURE,
  data
})
