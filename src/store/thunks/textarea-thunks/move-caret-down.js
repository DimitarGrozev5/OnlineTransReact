import { inputDataActions } from "../../input-data";
import moveOffsetDown from "../thunk-helpers/move-offset-down";

const moveCaretDownThunk = () => (dispatch, getState) => {
  const state = getState().inputData;
  const stateRange = { ...state.range };

  // If range is not collapsed, collapse to endContainer
  let sourceContainer = state.range.startContainer;
  let sourceOffset = state.range.startOffset;
  if (!stateRange.collapsed) {
    sourceContainer = state.range.endContainer;
    sourceOffset = state.range.endOffset;
  }

  const [container, offset] = moveOffsetDown(state, sourceContainer, sourceOffset);

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

export default moveCaretDownThunk;
