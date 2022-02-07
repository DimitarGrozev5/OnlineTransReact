import { messagesActions } from "../messages";
import { messageExecutables } from "./add-message";

const confirmMessageThunk = () => (dispatch, getState) => {
  dispatch(messagesActions.confirmMessage());
  messageExecutables.shift()();
};

export default confirmMessageThunk