import types from './types';

export const getSubscription = () => ({
  type: types.getSubscription,
});

export const getSubscriptionSuccess = (data) => ({
  type: types.getSubscriptionSuccess,
  data,
});

export const getSubscriptionFailure = () => ({
  type: types.getSubscriptionFailure,
});

export const createSubscription = (data) => ({
  type: types.createSubscription,
  data,
});

export const createSubscriptionSuccess = (data) => ({
  type: types.createSubscriptionSuccess,
  data,
});

export const createSubscriptionFailure = () => ({
  type: types.createSubscriptionFailure,
});
