import { deconstructFieldId } from "../helpers/deconstruct-id";
import placeCaret from "./place-caret";
import { getFieldProp } from "../helpers/field-prop";
import mergeFields from "./merge-fields";
import { modifyFieldProp } from "../helpers/field-prop";
import deleteSelection from "./delete-selection";

const handleDelete = (state) => {
  let [targetRowIndex, targetFieldIndex] = deconstructFieldId(
    state.range.startContainer
  );
  let newCaretPosition = state.range.startOffset;

  //If the Selection range is not collapsed delete the marked text
  if (!state.range.collapsed) {
    deleteSelection(state);
  }
  //If the Selection range is collapsed
  else {
    const [rowIndex, fieldIndex] = deconstructFieldId(
      state.range.startContainer
    );
    const caretPosition = state.range.startOffset;
    const fieldValue = getFieldProp(state, rowIndex, fieldIndex);

    // If the caret position is at the end of the field
    if (caretPosition === fieldValue.length) {
      // And is in the end of the row
      if (fieldIndex === state.data[rowIndex].length - 1) {
        // And not in the last row
        // Then move all fields from the next row to the current and delete the next row
        if (rowIndex < state.data.length - 1) {
          state.data[rowIndex].push(...state.data[rowIndex + 1].splice(0));
          state.data.splice(rowIndex + 1, 1);
        }
      }
      // If the caret position is at the end of the field
      // And is not in the end of the row
      // Merge the current field with the next
      else {
        mergeFields(state, rowIndex, fieldIndex);
      }
    }
    // If the caret position is not at the end of the field
    // Just delete a character
    else {
      const newFieldValue =
        fieldValue.substring(0, caretPosition) +
        fieldValue.substring(caretPosition + 1);
      modifyFieldProp(state, rowIndex, fieldIndex, newFieldValue);
    }
  }
  //Place caret
  placeCaret(state, targetRowIndex, targetFieldIndex, newCaretPosition);
};

export default handleDelete;
