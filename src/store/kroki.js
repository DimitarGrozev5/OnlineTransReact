import { createSlice } from "@reduxjs/toolkit";

const krokiSlice = createSlice({
  name: "kroki",
  initialState: {
    versionStack: [],
    versionIndex: -1,

    pointDataObj: {},
    pointDataArr: [],

    resections: [],
    lines: [],

    actions: [],
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
      state.actions = [...action.payload];
    },
    updateStateAndPatches(state, action) {
      const s = action.payload[0];
      state.pointDataObj = s.pointDataObj;
      state.pointDataArr = s.pointDataArr;

      state.versionStack = [
        ...state.versionStack.slice(0, state.versionIndex + 1),
        action.payload[1],
      ];

      state.versionIndex++;
    },
    updateStateAndPointer(state, action) {
      const s = action.payload[0];
      state.pointDataObj = s.pointDataObj;
      state.pointDataArr = s.pointDataArr;

      state.versionIndex = action.payload[1];
    },
  },
});

export const krokiActions = krokiSlice.actions;
export const krokiReducer = krokiSlice.reducer;
