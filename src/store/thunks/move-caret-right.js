import { inputDataActions } from "../input-data";
import moveOffsetRight from "./thunk-helpers/move-offset-right";

const moveCaretRightThunk = () => (dispatch, getState) => {
  const state = getState().inputData;

  //If the range is not collapsed, the collapse to end and exit
  if (!state.range.collapsed) {
    dispatch(
      inputDataActions.updateRange({
        anchorNode: state.range.endContainer,
        startContainer: state.range.endContainer,
        endContainer: state.range.endContainer,
        startOffset: state.range.endOffset,
        endOffset: state.range.endOffset,
        collapsed: true,
      })
    );
  } else {
    // Get target container and offset
    const [container, offset] = moveOffsetRight(
      state,
      state.range.startContainer,
      state.range.startOffset
    );

    // Dispatch action
    dispatch(
      inputDataActions.updateRange({
        anchorNode: container,
        startContainer: container,
        endContainer: container,
        startOffset: offset,
        endOffset: offset,
        collapsed: true,
      })
    );
  }
};

export default moveCaretRightThunk;
