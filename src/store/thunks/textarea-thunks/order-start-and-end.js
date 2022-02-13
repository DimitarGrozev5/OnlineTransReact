import { deconstructFieldId } from "../../helpers/deconstruct-id";
import { inputDataActions } from "../../input-data";

const orderStartAndEnd = (anchorNode, anchorOffset, focusNode, focusOffset) => (dispatch, getState) => {
  const [anchorRow, anchorField] = deconstructFieldId(anchorNode);
  const [focusRow, focusField] = deconstructFieldId(focusNode);

  let startContainer = anchorNode;
  let startOffset = anchorOffset;
  let endContainer = focusNode;
  let endOffset = focusOffset;
  
  if (anchorRow < focusRow) {
    // Do nothing
  } else if (anchorRow > focusRow) {
    endContainer = startContainer;
    endOffset = startOffset;
    startContainer = focusNode;
    startOffset = focusOffset;
  } else {
    if (anchorField < focusField) {
      // Do nothing
    } else if (anchorField > focusField) {
      endContainer = startContainer;
      endOffset = startOffset;
      startContainer = focusNode;
      startOffset = focusOffset;
    } else {
      if (anchorOffset < focusOffset) {
        // Do nothing
      } else {
        endContainer = startContainer;
        endOffset = startOffset;
        startContainer = focusNode;
        startOffset = focusOffset;
      }
    }
  }

  dispatch(
    inputDataActions.updateRange({
      anchorNode,
      anchorOffset,
      focusNode,
      focusOffset,
      startContainer,
      startOffset,
      endContainer,
      endOffset,
    })
  );
}

export default orderStartAndEnd;