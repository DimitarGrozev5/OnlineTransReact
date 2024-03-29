import { createSlice } from "@reduxjs/toolkit";

export const pages = {
  BGS_TRANS: "BGS_TRANS",
  KROKI: "KROKI",
};

const activePageSlice = createSlice({
  name: "page",
  initialState: { name: pages.BGS_TRANS },
  reducers: {
    changePage(state, action) {
      state.name = action.payload;
    },
  },
});

export const activePageActions = activePageSlice.actions;
export const activePageReducer = activePageSlice.reducer;
