import { messagesActions } from "../messages";

export const messageExecutables = [];

const addMessageThunk = (message, action) => (dispatch, getState) => {
  const nullFunction = () => {};
  messageExecutables.push(action || nullFunction);
  dispatch(messagesActions.addMessage(message));
};

export default addMessageThunk;
