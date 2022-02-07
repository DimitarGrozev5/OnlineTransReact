import { createSlice } from "@reduxjs/toolkit";

const hintsSlice = createSlice({
  name: "hints",
  initialState: {
    input: [
      // { xy: "bgs", h: "evrs" },
      // { xy: "cs70", h: "balt" },
    ],
    output: [
      // { xy: "cs70", h: "balt" },
    ],
  },
  reducers: {
    setHints(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const hintsActions = hintsSlice.actions;
export const hintsReducer = hintsSlice.reducer;
