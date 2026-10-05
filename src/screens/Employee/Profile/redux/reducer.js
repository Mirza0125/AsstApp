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

const initialState = {
  photos: false,
  requesting: false,
  profileData: false,
  employeePhotos: false,
  updatedProfile: false,
  profilePicture: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {...state, requesting: true};

    case GET_PROFILE_SUCCESS:
      return {...state, requesting: false, profileData: action.data};

    case GET_PROFILE_FAILURE:
      return {
        ...state,
        requesting: false,
      };

    case UPDATE_PROFILE:
      return {...state, requesting: true};

    case UPDATE_PROFILE_SUCCESS:
      return {...state, requesting: false, updatedProfile: action.data};

    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        requesting: false,
      };

    case UPLOAD_PHOTO:
      return {...state, requesting: true};

    case UPLOAD_PHOTO_SUCCESS:
      return {...state, requesting: false, photos: action.data};

    case UPLOAD_PHOTO_FAILURE:
      return {
        ...state,
        requesting: false,
      };

    case GET_EMPLOYEE_PHOTOS:
      return {...state, requesting: true};

    case GET_EMPLOYEE_PHOTOS_SUCCESS:
      return {...state, requesting: false, employeePhotos: action.data};

    case GET_EMPLOYEE_PHOTOS_FAILURE:
      return {
        ...state,
        requesting: false,
      };

    case UPDATE_PROFILE_PIC:
      return {...state, requesting: true};

    case UPDATE_PROFILE_PIC_SUCCESS:
      return {...state, requesting: false, profilePicture: action.data};

    case UPDATE_PROFILE_PIC_FAILURE:
      return {
        ...state,
        requesting: false,
      };

    default:
      return state;
  }
};
