import types from './types';

const initialState = {
  requesting: false,
  calendarEvents: [],
  addingToCalendar: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CALENDAR_EVENTS:
      return {
        ...state,
        requesting: true,
      };

    case types.GET_CALENDAR_EVENTS_SUCCESS:
      return {
        ...state,
        requesting: false,
        calendarEvents: action.data,
      };

    case types.GET_CALENDAR_EVENTS_FAILURE:
      return {
        ...state,
        requesting: false,
        calendarEvents: [],
      };

    case types.ADD_CALENDAR_EVENTS:
      return {
        ...state,
        addingToCalendar: true,
      };

    case types.ADD_CALENDAR_EVENTS_SUCCESS:
      return {
        ...state,
        addingToCalendar: false,
      };

    case types.ADD_CALENDAR_EVENTS_FAILURE:
      return {
        ...state,
        addingToCalendar: false,
      };
    default:
      return state;
  }
};
