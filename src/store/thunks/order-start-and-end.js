import { deconstructFieldId } from "../helpers/deconstruct-id";
import { inputDataActions } from "../input-data";

const orderStartAndEnd = (anchorNode, anchorOffset, focusContainer, focusOffset) => (dispatch, getState) => {
  const [anchorRow, anchorField] = deconstructFieldId(anchorNode);
  const [focusRow, focusField] = deconstructFieldId(focusContainer);

  let startContainer = anchorNode;
  let startOffset = anchorOffset;
  let endContainer = focusContainer;
  let endOffset = focusOffset;
  
  if (anchorRow < focusRow) {
    // Do nothing
  } else if (anchorRow > focusRow) {
    endContainer = startContainer;
    endOffset = startOffset;
    startContainer = focusContainer;
    startOffset = focusOffset;
  } else {
    if (anchorField < focusField) {
      // Do nothing
    } else if (anchorField > focusField) {
      endContainer = startContainer;
      endOffset = startOffset;
      startContainer = focusContainer;
      startOffset = focusOffset;
    } else {
      if (startOffset < focusOffset) {
        // Do nothing
      } else {
        endContainer = startContainer;
        endOffset = startOffset;
        startContainer = focusContainer;
        startOffset = focusOffset;
      }
    }
  }

  dispatch(
    inputDataActions.updateRange({
      anchorNode: anchorNode,
      startContainer,
      startOffset,
      endContainer,
      endOffset,
    })
  );
}

export default orderStartAndEnd;