import orderStartAndEnd from "./order-start-and-end";
import moveOffsetRight from "./thunk-helpers/move-offset-right";

const shiftSelectRightThunk = () => (dispatch, getState) => {
  const state = getState().inputData;

  // Pick the focus container
  let focusContainer = state.range.startContainer;
  let focusOffset = state.range.startOffset;
  if (
    state.range.startContainer === state.range.anchorNode &&
    state.range.startOffset === state.range.anchorOffset
  ) {
    focusContainer = state.range.endContainer;
    focusOffset = state.range.endOffset;
  }

  // Get the new focusContainer data
  const movedCaret = moveOffsetRight(state, focusContainer, focusOffset);
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

export default shiftSelectRightThunk;
