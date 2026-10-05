import {
  GET_SERVICES_REQUEST,
  GET_SERVICES_SUCCESS,
  GET_SERVICES_FAILURE,
} from "./type"

// GET Services
export const servicesRequest = () => ({
  type: GET_SERVICES_REQUEST,
})

export const servicesRequestSuccess = data => ({
  type: GET_SERVICES_SUCCESS,
  data
})

export const servicesRequestFailure = data => ({
  type: GET_SERVICES_FAILURE,
  data
})
