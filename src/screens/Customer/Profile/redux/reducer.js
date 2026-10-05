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

const initialState = {
  profilePicture: false,
  requesting: false,
  customerProfile: false,
  customerPhotos: false,
  profileQuestions: false,
  customerUpdatedProfile: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMER_PROFILE:
      return {...state, requesting: true};

    case GET_CUSTOMER_PROFILE_SUCCESS:
      return {...state, requesting: false, customerProfile: action.data};

    case GET_CUSTOMER_PROFILE_FAILURE:
      return {
        ...state,
        requesting: false,
      };

    case GET_QUESTION:
      return {...state, requesting: true};

    case GET_QUESTION_SUCCESS:
      return {...state, requesting: false, profileQuestions: action.data};

    case GET_QUESTION_FAILURE:
      return {
        ...state,
        requesting: false,
      };

    case UPDATE_CUSTOMER_PROFILE:
      return {...state, requesting: true};

    case UPDATE_CUSTOMER_PROFILE_SUCCESS:
      return {...state, requesting: false, customerUpdatedProfile: action.data};

    case UPDATE_CUSTOMER_PROFILE_FAILURE:
      return {
        ...state,
        requesting: false,
      };

    case UPDATE_CUSTOMER_PROFILE_PIC:
      return {...state, requesting: true};

    case UPDATE_CUSTOMER_PROFILE_PIC_SUCCESS:
      return {...state, requesting: false, profilePicture: action.data};

    case UPDATE_CUSTOMER_PROFILE_PIC_FAILURE:
      return {
        ...state,
        requesting: false,
      };

    default:
      return state;
  }
};
