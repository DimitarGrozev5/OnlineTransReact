import { messagesActions } from "../messages";

export const messageExecutables = [];

const addMessageThunk = (message, action) => (dispatch, getState) => {
  messageExecutables.push(action);
  dispatch(messagesActions.addMessage(message));
};

export default addMessageThunk;
