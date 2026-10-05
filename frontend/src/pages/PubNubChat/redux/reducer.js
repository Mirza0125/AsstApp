import {
  GET_ALL_USERS_USERS,
  GET_ALL_USERS_USERS_SUCCESS,
  GET_ALL_USERS_USERS_FAILURE,
  SET_DIRECT_USERS,
  SET_GROUP_USERS,
  POST_GROUP_CHAT_IMAGE,
  POST_GROUP_CHAT_IMAGE_SUCCESS,
  GET_PUBNUB_CHANNELS,
  GET_PUBNUB_CHANNELS_SUCCESS,
  GET_PUBNUB_CHANNELS_FAILURE,
  POST_PUBNUB_CHANNELS,
  POST_PUBNUB_CHANNELS_SUCCESS,
  POST_PUBNUB_CHANNELS_FAILURE,
  UPDATE_PUBNUB_CHANNELS,
  UPDATE_PUBNUB_CHANNELS_SUCCESS,
  UPDATE_PUBNUB_CHANNELS_FAILURE,
  REMOVE_PUBNUB_USER,
  REMOVE_PUBNUB_USER_SUCCESS,
  REMOVE_PUBNUB_USER_FAILURE,
  DELETE_PUBNUB_USER,
  DELETE_PUBNUB_USER_SUCCESS,
  DELETE_PUBNUB_USER_FAILURE,
  SEARCH_LIST_SHOW,
} from './type';

const initialState = {
  allUsersdata: false,
  requesting: false,
  error: false,
  dirctUser: false,
  groupUsers: [],
  groupChatImage: false,
  allChannelsData: false,
  updateChannelUsers: false,
  searchListStatus: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS_USERS:
      return {
        ...state,
        requesting: true,
      };
    case GET_ALL_USERS_USERS_SUCCESS:
      return {
        ...state,
        requesting: false,
        allUsersdata: action.data,
      };
    case GET_ALL_USERS_USERS_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data,
      };
    case SET_DIRECT_USERS:
      return {
        ...state,
        dirctUser: action.data,
      };
    case SET_GROUP_USERS:
      return {
        ...state,
        groupUsers: action.data,
      };

    case POST_GROUP_CHAT_IMAGE:
      return {
        ...state,
        requesting: false,
      };
    case POST_GROUP_CHAT_IMAGE_SUCCESS:
      return {
        ...state,
        groupChatImage: action.data,
      };

    case GET_PUBNUB_CHANNELS:
      return {
        ...state,
        requesting: true,
      };

    case GET_PUBNUB_CHANNELS_SUCCESS:
      return {
        ...state,
        requesting: false,
        allChannelsData: action.data,
      };
    case GET_PUBNUB_CHANNELS_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data,
      };

    case POST_PUBNUB_CHANNELS:
      return {
        ...state,
        requesting: true,
      };

    case POST_PUBNUB_CHANNELS_SUCCESS:
      return {
        ...state,
        requesting: false,
        // allChannelsData: action.data
      };
    case POST_PUBNUB_CHANNELS_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data,
      };

    case UPDATE_PUBNUB_CHANNELS:
      return {
        ...state,
        requesting: true,
      };

    case UPDATE_PUBNUB_CHANNELS_SUCCESS:
      return {
        ...state,
        requesting: false,
        // allChannelsData: action.data
      };
    case UPDATE_PUBNUB_CHANNELS_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data,
      };

    case REMOVE_PUBNUB_USER:
      return {
        ...state,
        requesting: true,
      };

    case REMOVE_PUBNUB_USER_SUCCESS:
      return {
        ...state,
        requesting: false,
        updateChannelUsers: action.data,
      };
    case REMOVE_PUBNUB_USER_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data,
      };

    case DELETE_PUBNUB_USER:
      return {
        ...state,
        requesting: true,
      };

    case DELETE_PUBNUB_USER_SUCCESS:
      return {
        ...state,
        requesting: false,
        // allChannelsData: action.data
      };
    case DELETE_PUBNUB_USER_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data,
      };
    case DELETE_PUBNUB_USER_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data,
      };
    case SEARCH_LIST_SHOW:
      return {
        ...state,
        searchListStatus: action.data,
      };
    default:
      return state;
  }
};
