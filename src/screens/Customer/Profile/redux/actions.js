import {
  GET_CUSTOMER_PROFILE,
  GET_CUSTOMER_PROFILE_SUCCESS,
  GET_CUSTOMER_PROFILE_FAILURE,
  UPDATE_CUSTOMER_PROFILE,
  UPDATE_CUSTOMER_PROFILE_SUCCESS,
  UPDATE_CUSTOMER_PROFILE_FAILURE,
  UPDATE_CUSTOMER_PROFILE_PIC,
  UPDATE_CUSTOMER_PROFILE_PIC_SUCCESS,
  UPDATE_CUSTOMER_PROFILE_PIC_FAILURE,
  GET_QUESTION,
  GET_QUESTION_SUCCESS,
  GET_QUESTION_FAILURE,
} from './types';

export const getQuestion = () => ({
  type: GET_QUESTION,
});

export const getQuestionSuccess = (data) => ({
  type: GET_QUESTION_SUCCESS,
  data,
});

export const getQuestionFailure = () => ({
  type: GET_QUESTION_FAILURE,
});

export const getCustomerProfile = () => ({
  type: GET_CUSTOMER_PROFILE,
});

export const getCustomerProfileSuccess = (data) => ({
  type: GET_CUSTOMER_PROFILE_SUCCESS,
  data,
});

export const getCustomerProfileFailure = () => ({
  type: GET_CUSTOMER_PROFILE_FAILURE,
});

export const updateProfile = (data, user) => ({
  type: UPDATE_CUSTOMER_PROFILE,
  data,
  user,
});

export const updateProfileSuccess = (data) => ({
  type: UPDATE_CUSTOMER_PROFILE_SUCCESS,
  data,
});

export const updateProfileFailure = () => ({
  type: UPDATE_CUSTOMER_PROFILE_FAILURE,
});

export const uploadProfilePic = (data, user) => ({
  type: UPDATE_CUSTOMER_PROFILE_PIC,
  data,
  user,
});

export const uploadProfilePicSuccess = (data) => ({
  type: UPDATE_CUSTOMER_PROFILE_PIC_SUCCESS,
  data,
});

export const uploadProfilePicFailure = () => ({
  type: UPDATE_CUSTOMER_PROFILE_PIC_FAILURE,
});
