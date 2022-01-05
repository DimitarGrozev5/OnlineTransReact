import { constructFieldId } from "../helpers/deconstruct-id";
import { inputDataActions } from "../input-data";

const findBestFitCaretThunk = (rowIndex, fieldIndex, targetFieldLength) => (dispatch, getState) => {
  // Get current caret
  const selection = window.getSelection();
  const range =
    selection && selection.rangeCount && selection.getRangeAt(0).cloneRange();

  // Save current caret X coordinate
  const initialCaretX = range.getClientRects()[0].x;

  // Loop from 0 to fieldBellowLength, to test which caret position has the closes X coordinate
  const domElement = document.getElementById(
    constructFieldId(rowIndex + 1, fieldIndex)
  ).firstChild;

  let mindX = 1000000;
  let minIndex = null;

  for (let i = 0; i <= targetFieldLength; i++) {
    range.setStart(domElement, i);
    range.collapse();
    const currentCaretX = range.getClientRects()[0].x;
    if (Math.abs(currentCaretX - initialCaretX) < mindX) {
      mindX = Math.abs(currentCaretX - initialCaretX);
      minIndex = i;
    }
  }

  // Dispatch action
  dispatch(
    inputDataActions.updateRange({
      anchorNode: constructFieldId(rowIndex + 1, fieldIndex),
      startContainer: constructFieldId(rowIndex + 1, fieldIndex),
      endContainer: constructFieldId(rowIndex + 1, fieldIndex),
      startOffset: minIndex,
      endOffset: minIndex,
      collapsed: true,
    })
  );
};

export default findBestFitCaretThunk;
