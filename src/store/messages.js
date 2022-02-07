import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: { messages: [], askedForGeolocationPermission: false },
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    confirmMessage(state) {
      state.messages.shift();
    },

    askedForGeolocationPermission(state) {
      state.askedForGeolocationPermission = true;
      console.log("asked")
    },
  },
});

export const messagesActions = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
