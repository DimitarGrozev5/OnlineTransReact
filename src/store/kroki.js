import { createSlice, original } from "@reduxjs/toolkit";

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
    updatePoints(state, action) {
      state.pointDataObj = action.payload[0];
      state.pointDataArr = action.payload[1];

      // state.versionStack.push(action.payload[2]);
      // console.log(original(state.versionStack));
      state.versionStack = [
        ...state.versionStack.slice(0, state.versionIndex + 1),
        action.payload[2],
      ];

      state.versionIndex++;
    },
    updatePointDataStructure(state, action) {
      state.pointDataObj = action.payload[0];
      state.pointDataArr = action.payload[1];
      state.versionIndex = action.payload[2];
    },
  },
});

export const krokiActions = krokiSlice.actions;
export const krokiReducer = krokiSlice.reducer;
