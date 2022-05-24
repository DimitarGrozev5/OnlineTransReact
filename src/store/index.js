import { configureStore } from "@reduxjs/toolkit";
import { hintsReducer } from "./hintsSlice";
import { inputDataReducer } from "./inputDataSlice";
import { systemsReducer } from "./systemsSlice";
import { krokiReducer } from "./krokiSlice";
import { messagesReducer } from "./messagesSlice";
import { activePageReducer } from "./activePageSlice";

const store = configureStore({
  reducer: {
    inputData: inputDataReducer,
    systems: systemsReducer,
    hints: hintsReducer,
    messages: messagesReducer,
    activePage: activePageReducer,
    kroki: krokiReducer,
  },
});

export default store;
