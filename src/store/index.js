import { configureStore } from "@reduxjs/toolkit";
import { inputDataReducer } from "./input-data";

const store = configureStore({
  reducer: {
    inputData: inputDataReducer,
  },
});

export default store;