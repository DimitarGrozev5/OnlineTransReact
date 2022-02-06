import { configureStore } from "@reduxjs/toolkit";
import { hintsReducer } from "./hints";
import { inputDataReducer } from "./input-data";
import { systemsReducer } from "./input-systems";

const store = configureStore({
  reducer: {
    inputData: inputDataReducer,
    systems: systemsReducer,
    hints: hintsReducer,
  },
});

export default store;
