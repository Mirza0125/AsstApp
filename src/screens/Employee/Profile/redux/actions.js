import {
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPLOAD_PHOTO,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_FAILURE,
  GET_EMPLOYEE_PHOTOS,
  GET_EMPLOYEE_PHOTOS_SUCCESS,
  GET_EMPLOYEE_PHOTOS_FAILURE,
  UPDATE_PROFILE_PIC,
  UPDATE_PROFILE_PIC_SUCCESS,
  UPDATE_PROFILE_PIC_FAILURE,
} from './types';

export const getProfile = () => ({
  type: GET_PROFILE,
});

export const getProfileSuccess = (data) => ({
  type: GET_PROFILE_SUCCESS,
  data,
});

export const getProfileFailure = () => ({
  type: GET_PROFILE_FAILURE,
});

export const updateProfile = (data, user) => ({
  type: UPDATE_PROFILE,
  data,
  user,
});

export const updateProfileSuccess = (data) => ({
  type: UPDATE_PROFILE_SUCCESS,
  data,
});

export const updateProfileFailure = () => ({
  type: UPDATE_PROFILE_FAILURE,
});

export const uploadPhoto = (data) => ({
  type: UPLOAD_PHOTO,
  data,
});

export const uploadPhotoSuccess = (data) => ({
  type: UPLOAD_PHOTO_SUCCESS,
  data,
});

export const uploadPhotoFailure = () => ({
  type: UPLOAD_PHOTO_FAILURE,
});

export const getEmployeePhotos = () => ({
  type: GET_EMPLOYEE_PHOTOS,
});

export const getEmployeePhotosSuccess = (data) => ({
  type: GET_EMPLOYEE_PHOTOS_SUCCESS,
  data,
});

export const getEmployeePhotosFailure = () => ({
  type: GET_EMPLOYEE_PHOTOS_FAILURE,
});

export const uploadProfilePic = (data, user) => ({
  type: UPDATE_PROFILE_PIC,
  data,
  user,
});

export const uploadProfilePicSuccess = (data) => ({
  type: UPDATE_PROFILE_PIC_SUCCESS,
  data,
});

export const uploadProfilePicFailure = () => ({
  type: UPDATE_PROFILE_PIC_FAILURE,
});
