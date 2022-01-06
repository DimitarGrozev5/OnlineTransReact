import {
  constructFieldId,
  deconstructFieldId,
} from "../helpers/deconstruct-id";
import { getFieldProp } from "../helpers/field-prop";
import { inputDataActions } from "../input-data";
import findBestFitCaretThunk from "./find-best-fit-caret";

const moveCaretDownThunk = () => (dispatch, getState) => {
  const state = getState().inputData;
  const stateRange = { ...state.range };

  // If range is not collapsed, collapse to endContainer
  if (!stateRange.collapsed) {
    stateRange.anchorNode = stateRange.endContainer;
    stateRange.startContainer = stateRange.endContainer;
    stateRange.startOffset = stateRange.endOffset;
    stateRange.collapsed = true;
  }

  // Extract field data
  const [rowIndex, fieldIndex] = deconstructFieldId(state.range.startContainer);

  // If the field is on the last row, move the caret to the end of the row
  if (rowIndex === state.rows.length - 1) {
    const lastFieldIndex = state.rows[rowIndex].fields.length - 1;
    const lastFieldLength = getFieldProp(
      state,
      rowIndex,
      lastFieldIndex,
      "value"
    ).length;
    dispatch(
      inputDataActions.updateRange({
        anchorNode: constructFieldId(rowIndex, lastFieldIndex),
        startContainer: constructFieldId(rowIndex, lastFieldIndex),
        endContainer: constructFieldId(rowIndex, lastFieldIndex),
        startOffset: lastFieldLength,
        endOffset: lastFieldLength,
        collapsed: true,
      })
    );
  }
  // If the field is not on the last row
  // check if there is a corresponding field bellow the current one
  else {
    // If not, move the caret to the last field in the bottom row
    if (state.rows[rowIndex + 1].fields.length <= fieldIndex) {
      const lastFieldIndex = state.rows[rowIndex + 1].fields.length - 1;
      const lastFieldLength = getFieldProp(
        state,
        rowIndex + 1,
        lastFieldIndex,
        "value"
      ).length;
      dispatch(
        inputDataActions.updateRange({
          anchorNode: constructFieldId(rowIndex + 1, lastFieldIndex),
          startContainer: constructFieldId(rowIndex + 1, lastFieldIndex),
          endContainer: constructFieldId(rowIndex + 1, lastFieldIndex),
          startOffset: lastFieldLength,
          endOffset: lastFieldLength,
          collapsed: true,
        })
      );
    }
    // If there is a corresponding field bellow the current one
    // Test move the caret from the first offset, to the last, to see
    // Where does it match best
    else {
      // Get field length
      const fieldBellowLength = getFieldProp(
        state,
        rowIndex + 1,
        fieldIndex,
        "value"
      ).length;

      // If the length of the field bellow is 0, move the caret there dirrectly
      if (fieldBellowLength === 0) {
        dispatch(
          inputDataActions.updateRange({
            anchorNode: constructFieldId(rowIndex + 1, fieldIndex),
            startContainer: constructFieldId(rowIndex + 1, fieldIndex),
            endContainer: constructFieldId(rowIndex + 1, fieldIndex),
            startOffset: 0,
            endOffset: 0,
            collapsed: true,
          })
        );
      }

      // If the length of the field bellow is abouve zero, test the best fiting caret position
      else {
        dispatch(findBestFitCaretThunk(rowIndex + 1, rowIndex, fieldIndex, fieldBellowLength));
      }
    }
  }
};

export default moveCaretDownThunk;
