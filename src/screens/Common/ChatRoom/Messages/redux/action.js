import types from './types';

export const getMessage = (data) => ({
  type: types.getMessage,
  data,
});
