import types from './types';

const initialState = {
  Message: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.getMessage:
      console.log('Message: action.data', action.data);
      return {...state, Message: action.data};

    default:
      return state;
  }
};
