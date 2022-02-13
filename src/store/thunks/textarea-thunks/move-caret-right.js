import { inputDataActions } from "../../input-data";
import moveOffsetRight from "../thunk-helpers/move-offset-right";

const moveCaretRightThunk = () => (dispatch, getState) => {
  const state = getState().inputData;

  //If the range is not collapsed, the collapse to end and exit
  if (!state.range.collapsed) {
    dispatch(
      inputDataActions.updateRange({
        anchorNode: state.range.endContainer,
        anchorOffset: state.range.endOffset,
        focusNode: state.range.endContainer,
        focusOffset: state.range.endOffset,
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
        anchorOffset: offset,
        focusNode: container,
        focusOffset: offset,
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
