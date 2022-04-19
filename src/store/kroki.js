import { createSlice } from "@reduxjs/toolkit";

const krokiSlice = createSlice({
  name: "kroki",
  initialState: {
    versionStack: [],

    pointDataObj: {},
    pointDataArr: [],

    resections: [],
    lines: [],

    actions: null,
  },
  reducers: {
    // Expects an array of points
    // It will create ids on the fly
    addPoints(state, action) {
      if (!state.pointDataArr.length) {
        action.payload.forEach((pt) => {
          state.pointDataObj[pt.id] = pt;
          state.pointDataArr.push(pt.id);
        });
      }
    },
    updateActions(state, action) {
      state.actions = action.payload;
    },
  },
});

export const krokiActions = krokiSlice.actions;
export const krokiReducer = krokiSlice.reducer;
