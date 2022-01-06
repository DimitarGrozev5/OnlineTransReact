import { constructFieldId } from "../helpers/deconstruct-id";
import { inputDataActions } from "../input-data";

const findBestFitCaretThunk =
  (targetRowIndex, rowIndex, fieldIndex, targetFieldLength) =>
  (dispatch, getState) => {
    // Get current caret
    const selection = window.getSelection();
    const range =
      selection && selection.rangeCount && selection.getRangeAt(0).cloneRange();

    // Save current caret X coordinate
    const initialCaretX = range.getClientRects()[0].x;

    // Loop from 0 to targetFieldLength, to test which caret position has the closes X coordinate
    const domElement = document.getElementById(
      constructFieldId(targetRowIndex, fieldIndex)
    ).firstChild;

    let mindX = 1000000;
    let minIndex = null;

    let iStart = targetRowIndex - rowIndex < 0 ? targetFieldLength : 0;
    let iEnd =
      targetRowIndex - rowIndex < 0
        ? (i) => i >= 0
        : (i) => i <= targetFieldLength;
    let iDir = targetRowIndex - rowIndex < 0 ? -1 : 1;

    for (let i = iStart; iEnd(i); i += iDir) {
      range.setStart(domElement, i);
      range.setEnd(domElement, i);
      const currentCaretX = range.getClientRects()[0].x;
      if (Math.abs(currentCaretX - initialCaretX) < mindX) {
        mindX = Math.abs(currentCaretX - initialCaretX);
        minIndex = i;
      }
    }

    // Dispatch action
    dispatch(
      inputDataActions.updateRange({
        anchorNode: constructFieldId(targetRowIndex, fieldIndex),
        startContainer: constructFieldId(targetRowIndex, fieldIndex),
        endContainer: constructFieldId(targetRowIndex, fieldIndex),
        startOffset: minIndex,
        endOffset: minIndex,
        collapsed: true,
      })
    );
  };

export default findBestFitCaretThunk;
