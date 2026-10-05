import types from './types';

const initialState = {
  requesting: false,
  notification: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.postNotification:
      return {...state, requesting: true};

    case types.postNotificationSuccess:
      return {...state, requesting: false, notification: action.data};

    case types.postNotificationFailure:
      return {
        ...state,
        requesting: false,
      };

    default:
      return state;
  }
};
