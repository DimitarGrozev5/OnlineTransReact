import { messagesActions } from "../messagesSlice";
import { messageExecutables } from "./add-message";

const cancelMessageThunk = () => (dispatch, getState) => {
  dispatch(messagesActions.confirmMessage());
  messageExecutables.shift();
};

export default cancelMessageThunk;
