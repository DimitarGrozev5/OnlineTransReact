import { createSlice } from "@reduxjs/toolkit";
import { produceWithPatches } from "@reduxjs/toolkit/node_modules/immer";

const krokiSlice = createSlice({
  name: "kroki",
  initialState: {
    versionStack: [],
    versionIndex: -1,

    pointDataObj: {},
    pointDataArr: [],

    // lines: Line[]
    // Line: Segment[]
    // Segment: LineSegment
    // LineSegment: {
    //   pt1: PointDataObj - id
    //   pt2: PointDataObj - id
    // }
    lines: [],
    resections: [],

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
    renamePoints(state) {
      const [newState, patch, reversePatch] = produceWithPatches(
        state,
        (draft) => {
          draft.pointDataArr.forEach(
            (ptId, i) => (draft.pointDataObj[ptId].n = i + 1)
          );
        }
      );
      state.pointDataObj = { ...newState.pointDataObj };
      const p = {
        caption: "Rename points",
        patch,
        reversePatch,
      };

      state.versionStack = [
        ...state.versionStack.slice(0, state.versionIndex + 1),
        [p],
      ];

      state.versionIndex++;
    },
    updateStateAndPatches(state, action) {
      const s = action.payload[0];
      state.pointDataObj = s.pointDataObj;
      state.pointDataArr = s.pointDataArr;
      state.lines = s.lines;

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
      state.lines = s.lines;

      state.versionIndex = action.payload[1];
    },
  },
});

export const krokiActions = krokiSlice.actions;
export const krokiReducer = krokiSlice.reducer;
