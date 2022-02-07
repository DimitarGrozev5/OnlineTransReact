import { createSlice } from "@reduxjs/toolkit";

const hintsSlice = createSlice({
  name: "hints",
  initialState: {
    input: [
      { xy: "bgs", h: "evrs" },
      { xy: "cs70", h: "balt" },
    ],
    output: [{ xy: "bgs", h: "evrs" }],
    inputIsSet: false,
    outputIsSet: false,
  },
  reducers: {
    setHints(state, action) {
      return { ...state, ...action.payload };
    },

    setInput(state) {
      state.inputIsSet = true;
    },
    setOutput(state) {
      state.outputIsSet = true;
    },
  },
});

export const hintsActions = hintsSlice.actions;
export const hintsReducer = hintsSlice.reducer;
