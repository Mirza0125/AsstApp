import types from './types';

const initialState = {
  requesting: false,
  onBoardData: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.getOnBoardData:
      return {...state, requesting: true};

    case types.getOnBoardDataSuccess:
      return {...state, requesting: false, onBoardData: action.data};

    case types.getOnBoardDataFailure:
      return {
        ...state,
        requesting: false,
      };

    default:
      return state;
  }
};
