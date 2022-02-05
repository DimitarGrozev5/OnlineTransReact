import {
  constructFieldId,
  deconstructFieldId,
} from "../../helpers/deconstruct-id";
import { getFieldProp } from "../../helpers/field-prop";

const moveOffsetRight = (state, container, offset) => {
  const [rowIndex, fieldIndex] = deconstructFieldId(container);

  //If the caret position is not in the end of the field, then move the caret one position right
  const fieldLength = getFieldProp(state, rowIndex, fieldIndex).length;
  if (offset < fieldLength) {
    return [container, offset + 1];
  }
  //If the caret is in the end of the field, then move it to the next field
  else if (offset === fieldLength) {
    //If the caret is not the last row, move the caret to the next row's first position
    if (fieldIndex < state.data[rowIndex].length - 1) {
      return [constructFieldId(rowIndex, fieldIndex + 1), 0];
    }
    //If the field is the last row, move the caret to the first position in the next row
    else {
      //If there is a next row, move the caret to there
      if (rowIndex < state.data.length - 1) {
        return [constructFieldId(rowIndex + 1, 0), 0];
      }
      //If there is no previous row, do nothing
      else {
        return [container, offset];
      }
    }
  }
};

export default moveOffsetRight;
