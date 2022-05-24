import { messagesActions } from "../messagesSlice";

export const messageExecutables = [];

const addMessageThunk = (payload) => (dispatch, getState) => {
  const message = payload.msg;
  const action = payload.action;
  const timeout = payload.timeout;
  const cancelable = payload.cancelable;

  const nullFunction = () => {};
  messageExecutables.push(action || nullFunction);
  dispatch(
    messagesActions.addMessage({ msg: message, cancelable: cancelable })
  );

  if (timeout) {
    setTimeout(() => {
      dispatch(messagesActions.confirmMessage());
    }, timeout);
  }
};

export default addMessageThunk;
