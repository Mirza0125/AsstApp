import types from './types';

export const getHomeData = () => ({
  type: types.getHomeData,
});

export const getHomeDataSuccess = (data) => ({
  type: types.getHomeDataSuccess,
  data,
});

export const getHomeDataFailure = () => ({
  type: types.getHomeDataFailure,
});

// export const searchServices = query => ({
//   type: types.searchServices,
//   query,
// });

// export const searchServicesSuccess = data => ({
//   type: types.searchServicesSuccess,
//   data,
// });

// export const resetSearchServices = () => ({
//   type: types.resetSearchServices,
// });

// export const selectService = item => ({
//   type: types.selectService,
//   item,
// });

// export const selectServiceSuccess = data => ({
//   type: types.selectServiceSuccess,
//   data,
// });

// export const resetSelectService = () => ({
//   type: types.resetSelectService,
// });
