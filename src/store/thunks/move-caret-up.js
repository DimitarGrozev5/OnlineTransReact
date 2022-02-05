import { inputDataActions } from "../input-data";
import moveOffsetUp from "./thunk-helpers/move-offset-up";

const moveCaretUpThunk = () => (dispatch, getState) => {
  const state = getState().inputData;

  // If range is not collapsed, collapse to startContainer
  const sourceContainer = state.range.startContainer;
  const sourceOffset = state.range.startOffset;

  const [container, offset] = moveOffsetUp(
    state,
    sourceContainer,
    sourceOffset
  );

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
};

export default moveCaretUpThunk;
