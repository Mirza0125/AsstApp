import {
  DELETE_NOTIFICATION_FAILURE,
  DELETE_NOTIFICATION_REQUEST,
  DELETE_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION,
  GET_NOTIFICATION_FAILURE,
  GET_NOTIFICATION_SUCCESS,
  POST_MARK_READ,
  POST_MARK_READ_FAILURE,
  POST_MARK_READ_SUCCESS
} from "./type"

// Notification Lists
export const getNotificationList = (data) => ({
  type: GET_NOTIFICATION,
  data
})
export const getNotificationListSuccess = (data) => ({
  type: GET_NOTIFICATION_SUCCESS,
  data
})
export const getNotificationListFailure = (data) => ({
  type: GET_NOTIFICATION_FAILURE,
  data
})

// Mark Read
export const postMarkReadNotification = (data) => ({
  type: POST_MARK_READ,
  data
})
export const postMarkReadNotificationSuccess = (data) => ({
  type: POST_MARK_READ_SUCCESS,
  data
})
export const postMarkReadNotificationFailure = (data) => ({
  type: POST_MARK_READ_FAILURE,
  data
})

// Delete Notification

export const deleteNotificationRequest = data => ({
  type: DELETE_NOTIFICATION_REQUEST,
  data
})

export const deleteNotificationSuccess = data => ({
  type: DELETE_NOTIFICATION_SUCCESS,
  data
})

export const deleteNotificationFailure = data => ({
  type: DELETE_NOTIFICATION_FAILURE,
  data
})