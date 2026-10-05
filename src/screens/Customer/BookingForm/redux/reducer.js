import types from './types';

const initialState = {
  booking: false,
  questions: false,
  requesting: false,
  bagServices: false,
  notification: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.getQuestion:
      return {...state, requesting: true};

    case types.getQuestionSuccess:
      return {...state, requesting: false, questions: action.data};

    case types.getQuestionFailure:
      return {
        ...state,
        requesting: false,
      };

    case types.postBookingForm:
      return {...state, requesting: true};

    case types.postBookingFormSuccess:
      return {...state, requesting: false, booking: action.data};

    case types.postBookingFormFailure:
      return {
        ...state,
        requesting: false,
      };

    case types.postNotification:
      return {...state, requesting: true};

    case types.postNotificationSuccess:
      return {...state, requesting: false, notification: action.data};

    case types.postNotificationFailure:
      return {
        ...state,
        requesting: false,
      };

    // case types.addToBag:
    //   return {...state, requesting: true};

    case types.addToBag:
      return {bagServices: action.data};

    case types.addToBagSuccess:
      return {...state, requesting: false, bagServices: action.data};

    case types.addToBagFailure:
      return {
        ...state,
        requesting: false,
      };

    default:
      return state;
  }
};
