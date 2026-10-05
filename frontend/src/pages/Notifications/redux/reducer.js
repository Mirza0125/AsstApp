import {
  DELETE_NOTIFICATION_FAILURE,
  DELETE_NOTIFICATION_REQUEST,
  DELETE_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION, GET_NOTIFICATION_FAILURE, GET_NOTIFICATION_SUCCESS, POST_MARK_READ, POST_MARK_READ_FAILURE, POST_MARK_READ_SUCCESS
} from "./type"

const initialState = {
  postMarkReadData: false,
  error: false,
  requesting: false,
  notificationDeleted: false,
  getNotifications: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    // Notification List
    case GET_NOTIFICATION:
      return {
        ...state,
        requesting: true
      }

    case GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        requesting: false,
        getNotifications: action.data
      }
    case GET_NOTIFICATION_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data
      }
    // Mark Read
    case POST_MARK_READ:
      return {
        ...state,
        requesting: true
      }
    case POST_MARK_READ_SUCCESS:
      return {
        ...state,
        requesting: false,
        postMarkReadData: action.data
      }
    case POST_MARK_READ_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data
      }

    // Delete Notification
    case DELETE_NOTIFICATION_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        requesting: false,
        notificationDeleted: action.data
      };
    case DELETE_NOTIFICATION_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data,
      };

    default:
      return state
  }
}
