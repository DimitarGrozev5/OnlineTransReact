import placeCaret from "../commands/place-caret";
import { inputDataActions } from "../input-data";
import moveOffsetLeft from "./thunk-helpers/move-offset-left";

const moveCaretLeftThunk = () => (dispatch, getState) => {
  const state = getState().inputData;

  //If the range is not collapsed, the collapse to start and exit
  if (!state.range.collapsed) {
    dispatch(
      inputDataActions.updateRange({
        anchorNode: state.range.startContainer,
        anchorOffset: state.range.startOffset,
        focusNode: state.range.startContainer,
        focusOffset: state.range.startOffset,
        startContainer: state.range.startContainer,
        endContainer: state.range.startContainer,
        startOffset: state.range.startOffset,
        endOffset: state.range.startOffset,
        collapsed: true,
      })
    );
  } else {
    // Get target container and offset
    const [container, offset] = moveOffsetLeft(
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

export default moveCaretLeftThunk;
