import { deconstructFieldId } from "../helpers/deconstruct-id";
import placeCaret from "./place-caret";
import { getFieldProp } from "../helpers/field-prop";
import mergeFields from "./merge-fields";
import { modifyFieldProp } from "../helpers/field-prop";
import deleteSelection from "./delete-selection";

const handleBackspace = (state) => {
  let [targetRowIndex, targetFieldIndex] = deconstructFieldId(
    state.range.startContainer
  );
  let newCaretPosition = state.range.startOffset;

  //If the Selection range is not collapsed delete the marked text
  if (!state.range.collapsed) {
    deleteSelection(state);
  } else {
    const [rowIndex, fieldIndex] = [targetRowIndex, targetFieldIndex];
    const caretPosition = newCaretPosition;

    // If the caret position is in the begining of the field
    if (caretPosition === 0) {
      // And in the begining of the row
      if (fieldIndex === 0) {
        // And not in the first row
        // Then move all of the fields to the prevous row and delete the current row
        if (rowIndex !== 0) {
          targetRowIndex--;
          targetFieldIndex = state.rows[rowIndex - 1].fields.length;
          newCaretPosition = 0;

          state.rows[rowIndex - 1].fields.push(
            ...state.rows[rowIndex].fields.splice(0)
          );
          state.rows.splice(rowIndex, 1);
        }
      }
      // If the caret position is in the begining of the field
      // But not in the begining of the row
      // Then murge the two fields
      else {
        newCaretPosition = getFieldProp(
          state,
          rowIndex,
          fieldIndex - 1,
          "value"
        ).length;
        targetFieldIndex--;
        mergeFields(state, rowIndex, fieldIndex - 1);
      }
    }
    // If the caret position is not in the begining of the field
    else {
      const fieldValue = getFieldProp(state, rowIndex, fieldIndex, "value");
      const newFieldValue =
        fieldValue.substring(0, caretPosition - 1) +
        fieldValue.substring(caretPosition);
      modifyFieldProp(state, rowIndex, fieldIndex, "value", newFieldValue);

      //Configure caret
      newCaretPosition--;
    }
  }
  //Place caret
  placeCaret(state, targetRowIndex, targetFieldIndex, newCaretPosition);
};

export default handleBackspace;
