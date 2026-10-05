import types from './types';

export const getEvents = (data) => ({
  type: types.GET_EVENTS,
  data,
});

export const getEventsSuccess = (data) => ({
  type: types.GET_EVENTS_SUCCESS,
  data,
});

export const getEventsfailure = (data) => ({
  type: types.GET_EVENTS_FAILURE,
  data,
});
