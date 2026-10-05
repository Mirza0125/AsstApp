import types from './types';

export const getCalendarEvents = (data) => ({
  type: types.GET_CALENDAR_EVENTS,
  data,
});

export const getCalendarEventsSuccess = (data) => ({
  type: types.GET_CALENDAR_EVENTS_SUCCESS,
  data,
});

export const getCalendarEventsfailure = (data) => ({
  type: types.GET_CALENDAR_EVENTS_FAILURE,
  data,
});

export const addCalendarEvents = (data) => ({
  type: types.ADD_CALENDAR_EVENTS,
  data,
});

export const addCalendarEventsSuccess = (data) => ({
  type: types.ADD_CALENDAR_EVENTS_SUCCESS,
  data,
});

export const addCalendarEventsfailure = (data) => ({
  type: types.ADD_CALENDAR_EVENTS_FAILURE,
  data,
});
