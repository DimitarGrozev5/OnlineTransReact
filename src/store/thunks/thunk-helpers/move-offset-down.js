import {
  constructFieldId,
  deconstructFieldId,
} from "../../helpers/deconstruct-id";
import { getFieldProp } from "../../helpers/field-prop";
import findBestFitOffset from "./find-best-fit-offset";

const moveOffsetDown = (state, targetContainer, targetOffset) => {
  const [rowIndex, fieldIndex] = deconstructFieldId(targetContainer);

  // If the field is on the last row, move the caret to the end of the row
  if (rowIndex === state.data.length - 1) {
    const lastFieldIndex = state.data[rowIndex].length - 1;
    const lastFieldLength = getFieldProp(
      state,
      rowIndex,
      lastFieldIndex
    ).length;
    return [constructFieldId(rowIndex, lastFieldIndex), lastFieldLength];
  }
  // If the field is not on the last row
  // check if there is a corresponding field bellow the current one
  else {
    // If not, move the caret to the last field in the bottom row
    if (state.data[rowIndex + 1].length <= fieldIndex) {
      const lastFieldIndex = state.data[rowIndex + 1].length - 1;
      const lastFieldLength = getFieldProp(
        state,
        rowIndex + 1,
        lastFieldIndex
      ).length;
      return [constructFieldId(rowIndex + 1, lastFieldIndex), lastFieldLength];
    }
    // If there is a corresponding field bellow the current one
    // Test move the caret from the first offset, to the last, to see
    // Where does it match best
    else {
      // Get field length
      const fieldBellowLength = getFieldProp(
        state,
        rowIndex + 1,
        fieldIndex
      ).length;

      // If the length of the field bellow is 0, move the caret there dirrectly
      if (fieldBellowLength === 0) {
        return [constructFieldId(rowIndex + 1, fieldIndex), 0];
      }

      // If the length of the field bellow is abouve zero, test the best fiting caret position
      else {
        return findBestFitOffset(
          rowIndex + 1,
          rowIndex,
          fieldIndex,
          targetOffset,
          fieldBellowLength
        );
      }
    }
  }
};

export default moveOffsetDown; // Extract field data
