import orderStartAndEnd from "./order-start-and-end";
import moveOffsetDown from "../thunk-helpers/move-offset-down";

const shiftSelectDownThunk = () => (dispatch, getState) => {
  const state = getState().inputData;

  // Pick the focus container
  // let [focusContainer, focusOffset] = pickFocusContainer(state);
  let focusContainer = state.range.focusNode;
  let focusOffset = state.range.focusOffset;

  // Get the new focusContainer data
  const movedCaret = moveOffsetDown(state, focusContainer, focusOffset);
  focusContainer = movedCaret[0];
  focusOffset = movedCaret[1];
  
  // Sort start container and end container
  dispatch(
    orderStartAndEnd(
      state.range.anchorNode,
      state.range.anchorOffset,
      focusContainer,
      focusOffset
    )
  );
};

export default shiftSelectDownThunk;
