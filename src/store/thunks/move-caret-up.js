import {
  constructFieldId,
  deconstructFieldId,
} from "../helpers/deconstruct-id";
import { getFieldProp } from "../helpers/field-prop";
import { inputDataActions } from "../input-data";
import findBestFitCaretThunk from "./find-best-fit-caret";

const moveCaretUpThunk = () => (dispatch, getState) => {
  const state = getState().inputData;
  const stateRange = { ...state.range };

  // If range is not collapsed, collapse to startContainer
  if (!stateRange.collapsed) {
    stateRange.anchorNode = stateRange.startContainer;
    stateRange.startContainer = stateRange.startContainer;
    stateRange.startOffset = stateRange.startOffset;
    stateRange.collapsed = true;
  }

  // Extract field data
  const [rowIndex, fieldIndex] = deconstructFieldId(state.range.startContainer);

  // If the field is on the first row, move the caret to the start of the row
  if (rowIndex === 0) {
    dispatch(
      inputDataActions.updateRange({
        anchorNode: constructFieldId(rowIndex, 0),
        startContainer: constructFieldId(rowIndex, 0),
        endContainer: constructFieldId(rowIndex, 0),
        startOffset: 0,
        endOffset: 0,
        collapsed: true,
      })
    );
  }
  // If the field is not on the first row
  else {
    // check if there is a corresponding field above the current one
    // If not, move the caret to the last field in the top row
    if (state.rows[rowIndex - 1].fields.length <= fieldIndex) {
      const lastFieldIndex = state.rows[rowIndex - 1].fields.length - 1;
      const lastFieldLength = getFieldProp(
        state,
        rowIndex - 1,
        lastFieldIndex,
        "value"
      ).length;
      dispatch(
        inputDataActions.updateRange({
          anchorNode: constructFieldId(rowIndex - 1, lastFieldIndex),
          startContainer: constructFieldId(rowIndex - 1, lastFieldIndex),
          endContainer: constructFieldId(rowIndex - 1, lastFieldIndex),
          startOffset: lastFieldLength,
          endOffset: lastFieldLength,
          collapsed: true,
        })
      );
    }
    // If there is a corresponding field above the current one
    // Test move the caret from the first offset, to the last, to see
    // Where does it match best
    else {
      // Get field length
      const fieldAboveLength = getFieldProp(
        state,
        rowIndex - 1,
        fieldIndex,
        "value"
      ).length;

      // If the length of the field above is 0, move the caret there dirrectly
      if (fieldAboveLength === 0) {
        dispatch(
          inputDataActions.updateRange({
            anchorNode: constructFieldId(rowIndex - 1, fieldIndex),
            startContainer: constructFieldId(rowIndex - 1, fieldIndex),
            endContainer: constructFieldId(rowIndex - 1, fieldIndex),
            startOffset: 0,
            endOffset: 0,
            collapsed: true,
          })
        );
      }

      // If the length of the field above is above zero, test the best fiting caret position
      else {
        dispatch(findBestFitCaretThunk(rowIndex - 1, rowIndex, fieldIndex, fieldAboveLength));
      }
    }
  }
};

export default moveCaretUpThunk;
