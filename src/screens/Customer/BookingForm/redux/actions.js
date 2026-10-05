import types from './types';

export const getQuestion = (id) => ({
  type: types.getQuestion,
  id,
});

export const getQuestionSuccess = (data) => ({
  type: types.getQuestionSuccess,
  data,
});

export const getQuestionFailure = () => ({
  type: types.getQuestionFailure,
});

export const postBookingForm = (data) => ({
  type: types.postBookingForm,
  data,
});

export const postBookingFormSuccess = (data) => ({
  type: types.postBookingFormSuccess,
  data,
});

export const postBookingFormFailure = () => ({
  type: types.postBookingFormFailure,
});

export const postNotification = (data) => ({
  type: types.postNotification,
  data,
});

export const postNotificationSuccess = (data) => ({
  type: types.postNotificationSuccess,
  data,
});

export const postNotificationFailure = () => ({
  type: types.postNotificationFailure,
});

export const addToBag = (data) => ({
  type: types.addToBag,
  data,
});

export const addToBagSuccess = (data) => ({
  type: types.addToBagSuccess,
  data,
});

export const addToBagFailure = () => ({
  type: types.addToBagFailure,
});
