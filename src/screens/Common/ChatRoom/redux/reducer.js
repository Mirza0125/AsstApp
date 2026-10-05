import types from './types';

const initialState = {
  unreadCount: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.getUnreadCount:
      return {...state, unreadCount: action.data};

    default:
      return state;
  }
};
