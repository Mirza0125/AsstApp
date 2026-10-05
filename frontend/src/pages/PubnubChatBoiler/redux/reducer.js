import {
  GET_USERS_LIST_FAILURE,
  GET_USERS_LIST_REQUEST,
  GET_USERS_LIST_SUCCESS
} from "./type"

const initialState = {
  usersListInfo: false,
  error: false,
  requesting: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    // GET USERS LIST REDUCER
    case GET_USERS_LIST_REQUEST:
      return {
        ...state,
        requesting: true
      }

    case GET_USERS_LIST_SUCCESS:
      return {
        ...state,
        requesting: false,
        usersListInfo: action.data
      }
    case GET_USERS_LIST_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data
      }

    default:
      return state
  }
}
