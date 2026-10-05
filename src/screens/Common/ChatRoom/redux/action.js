import types from './types';

export const getUnreadCount = (data) => ({
  type: types.getUnreadCount,
  data,
});
