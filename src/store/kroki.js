import { createSlice } from "@reduxjs/toolkit";

const krokiSlice = createSlice({
  name: "kroki",
  initialState: {
    versionStack: [],

    pointData: [],
    resections: [],
    lines: [],

    currentCommand: null,
    actions: [],
  },
  reducers: {
    // Expects an array of points
    // It will create ids on the fly
    addPoints(state, action) {
      if (!state.pointData.length) {
        state.pointData = action.payload;
      }
    },
  },
});

export const krokiActions = krokiSlice.actions;
export const krokiReducer = krokiSlice.reducer;
