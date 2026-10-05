import {
  GET_DESIGNERS_REQUEST,
  GET_DESIGNERS_SUCCESS,
  GET_DESIGNERS_FAILURE,
  DELETE_DESIGNERS_REQUEST,
  DELETE_DESIGNERS_SUCCESS,
  DELETE_DESIGNERS_FAILURE,
} from './type';

const initialState = {
  designers: false,
  error: false,
  requesting: false,
  deleteDesignersRequesting: false,
  designerRemoved: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    // GET Designers
    case GET_DESIGNERS_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case GET_DESIGNERS_SUCCESS:
      return {
        ...state,
        requesting: false,
        designers: action.data,
      };

    case GET_DESIGNERS_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data,
      };

    // DELETE Designers
    case DELETE_DESIGNERS_REQUEST:
      return {
        ...state,
        deleteDesignersRequesting: true,
      };
    case DELETE_DESIGNERS_SUCCESS:
      return {
        ...state,
        deleteDesignersRequesting: false,
        designerRemoved: action.data
      };
    case DELETE_DESIGNERS_FAILURE:
      return {
        ...state,
        deleteDesignersRequesting: false,
        error: action.data,
      };

    default:
      return state;
  }
};
