import { configureStore } from "@reduxjs/toolkit";
import { hintsReducer } from "./hints";
import { inputDataReducer } from "./input-data";
import { systemsReducer } from "./input-systems";
import { messagesReducer } from "./messages";

const store = configureStore({
  reducer: {
    inputData: inputDataReducer,
    systems: systemsReducer,
    hints: hintsReducer,
    messages: messagesReducer,
  },
});

export default store;
