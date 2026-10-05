import { 
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
} from './type'

export const updateProfileRequest = data => ({
  type: UPDATE_PROFILE_REQUEST,
  data
})

export const updateProfileSuccess = data => ({
  type: UPDATE_PROFILE_SUCCESS,
  data
})

export const updateProfileFailure = data => ({
  type: UPDATE_PROFILE_FAILURE,
  data
})
