import { configureStore } from "@reduxjs/toolkit";
import { inputDataReducer } from "./input-data";
import { systemsReducer } from "./input-systems";

const store = configureStore({
  reducer: {
    inputData: inputDataReducer,
    systems: systemsReducer,
  },
});

export default store;
