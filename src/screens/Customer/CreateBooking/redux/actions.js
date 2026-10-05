import types from './types';

export const getEmployessByServiceId = (data) => ({
  type: types.getEmployessByServiceId,
  data,
});

export const getEmployessByServiceIdSuccess = (data) => ({
  type: types.getEmployessByServiceIdSuccess,
  data,
});

export const getEmployessByServiceIdFailure = () => ({
  type: types.getEmployessByServiceIdFailure,
});

export const getAvailableSlots = (data) => ({
  type: types.getAvailableSlotsByEmployee,
  data,
});

export const getAvailableSlotsByEmployeeSuccess = (data) => ({
  type: types.getAvailableSlotsByEmployeeSuccess,
  data,
});

export const getAvailableSlotsByEmployeeFailure = () => ({
  type: types.getAvailableSlotsByEmployeeFailure,
});
