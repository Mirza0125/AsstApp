import {
  POST_DESIGNER_REQUEST,
  POST_DESIGNER_SUCCESS,
  POST_DESIGNER_FAILURE,
} from "./type"

const initialState = {
  designerInfo: false,
  error: false,
  requesting: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_DESIGNER_REQUEST:
      return {
        ...state,
        requesting: true
      }

    case POST_DESIGNER_SUCCESS:
      return {
        ...state,
        requesting: false,
        designerInfo: action.data
      }
    case POST_DESIGNER_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data
      }

    default:
      return state
  }
}
