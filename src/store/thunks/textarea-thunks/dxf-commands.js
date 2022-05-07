export const updateDxfState = (action) => (state) => {
  state.dxfData = { ...action.payload };
};

export const clearDxfState = (state) => (state.dxfData = null);
