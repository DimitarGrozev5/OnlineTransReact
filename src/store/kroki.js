import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const krokiSlice = createSlice({
  name: "kroki",
  initialState: {
    versionStack: [],

    pointData: [],
    resections: [],
    lines: [],

    availableActions: [],
  },
  reducers: {
    // Expects an array of points
    // It will create ids on the fly
    addPoints(state, action) {
      if (!state.pointData.length) {
        action.payload.forEach((point) => {
          const id = nanoid();
          let fields = ["n", "x", "y", "h", "c"];
          const data = point
            .slice(0, 5)
            .reduce((obj, val) => ({ ...obj, [fields.shift()]: val }), {});
          const code = data.c;

          state.pointData.push({ data, code });
        });
      }
    },
  },
});

export const krokiActions = krokiSlice.actions;
export const krokiReducer = krokiSlice.reducer;
