import {
  constructFieldId,
  deconstructFieldId,
} from "../../helpers/deconstruct-id";
import { getFieldProp } from "../../helpers/field-prop";

const moveOffsetLeft = (state, container, offset) => {
  const [rowIndex, fieldIndex] = deconstructFieldId(container);

  //If the caret position is not in the begining of the field, then move the caret one position left
  if (offset > 0) {
    return [container, offset - 1];
  }
  //If the caret is in the beginning of the field, then move it to the previous field
  else if (offset === 0) {
    //If the field is not the first in the row, move the caret to it's last position
    if (fieldIndex > 0) {
      const prevFieldLength = getFieldProp(
        state,
        rowIndex,
        fieldIndex - 1,
        "value"
      ).length;
      return [constructFieldId(rowIndex, fieldIndex - 1), prevFieldLength];
    }
    //If the field is the first in the row, move the caret to the last position in the previous row
    else {
      //If there is a previous row, move the caret to there
      if (rowIndex > 0) {
        const prevFieldIndex = state.rows[rowIndex - 1].fields.length - 1;
        const prevFieldLength = getFieldProp(
          state,
          rowIndex - 1,
          prevFieldIndex,
          "value"
        ).length;
        return [
          constructFieldId(rowIndex - 1, prevFieldIndex),
          prevFieldLength,
        ];
      }
      //If there is no previous row, do nothing
      else {
        return [container, offset];
      }
    }
  }
};

export default moveOffsetLeft;
