import { constructFieldId } from "../../helpers/deconstruct-id";

const findBestFitOffset = (
  targetRowIndex,
  rowIndex,
  fieldIndex,
  offset,
  targetFieldLength
) => {
  // Get current caret
  // const selection = window.getSelection();
  // const range =
  //   selection && selection.rangeCount && selection.getRangeAt(0).cloneRange();
  const range = document.createRange();
  let container = document.getElementById(
    constructFieldId(rowIndex, fieldIndex)
  );
  container = container.firstChild ? container.firstChild : container;
  range.setStart(container, offset);
  range.setEnd(container, offset);

  // Save current caret X coordinate
  const initialCaretRect = range.getClientRects();
  let initialCaretX;
  if (!initialCaretRect.length) {
    // If the field is empty the ClientRects array is also empty
    const fieldRect = range.startContainer.parentElement.getClientRects()[0];
    initialCaretX = fieldRect.x + fieldRect.width / 2;
  } else {
    initialCaretX = initialCaretRect[0].x;
  }

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
  return [constructFieldId(targetRowIndex, fieldIndex), minIndex];
};

export default findBestFitOffset;
