import {
  constructFieldId,
  deconstructFieldId,
} from "../../helpers/deconstruct-id";
import { getFieldProp } from "../../helpers/field-prop";
import findBestFitOffset from "./find-best-fit-offset";

const moveOffsetUp = (state, targetContainer, targetOffset) => {
  // Extract field data
  const [rowIndex, fieldIndex] = deconstructFieldId(targetContainer);

  // If the field is on the first row, move the caret to the start of the row
  if (rowIndex === 0) {
    return [constructFieldId(rowIndex, 0), 0];
  }
  // If the field is not on the first row
  else {
    // check if there is a corresponding field above the current one
    // If not, move the caret to the last field in the top row
    if (state.data[rowIndex - 1].length <= fieldIndex) {
      const lastFieldIndex = state.data[rowIndex - 1].length - 1;
      const lastFieldLength = getFieldProp(
        state,
        rowIndex - 1,
        lastFieldIndex
      ).length;
      return [constructFieldId(rowIndex - 1, lastFieldIndex), lastFieldLength];
    }
    // If there is a corresponding field above the current one
    // Test move the caret from the first offset, to the last, to see
    // Where does it match best
    else {
      // Get field length
      const fieldAboveLength = getFieldProp(
        state,
        rowIndex - 1,
        fieldIndex
      ).length;

      // If the length of the field above is 0, move the caret there dirrectly
      if (fieldAboveLength === 0) {
        return [constructFieldId(rowIndex - 1, fieldIndex), 0];
      }

      // If the length of the field above is above zero, test the best fiting caret position
      else {
        return findBestFitOffset(
          rowIndex - 1,
          rowIndex,
          fieldIndex,
          targetOffset,
          fieldAboveLength
        );
      }
    }
  }
};

export default moveOffsetUp;
