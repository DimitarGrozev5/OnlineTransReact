import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const krokiSlice = createSlice({
  name: "kroki",
  initialState: {
    pointData: {},
    pointsOrder: [],
    versionStack: [],
    resections: [],
    lines: [],
  },
  reducers: {
    // Expects an array of points
    // It will create ids on the fly
    addPoints(state, action) {
      if (!state.pointsOrder.length) {
        action.payload.forEach((point) => {
          const id = nanoid();
          let fields = ["n", "x", "y", "h", "c"];
          const data = point
            .slice(0, 5)
            .reduce((obj, val) => ({ ...obj, [fields.shift()]: val }), {});
          const code = data[4] || null;

          state.pointData[id] = { data, code };
          state.pointsOrder.push(id);
        });
      }
    },
  },
});

export const krokiActions = krokiSlice.actions;
export const krokiReducer = krokiSlice.reducer;
