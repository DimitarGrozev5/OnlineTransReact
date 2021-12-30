import { deconstructFieldId } from "../helpers/deconstruct-id";
import placeCaret from "./place-caret";
import { getFieldProp } from "../helpers/field-prop";
import mergeFields from "./merge-fields";
import { modifyFieldProp } from "../helpers/field-prop";

const handleDelete = (state) => {
  let [targetRowIndex, targetFieldIndex] = deconstructFieldId(
    state.range.startContainer
  );
  let newCaretPosition = state.range.startOffset;
  //If the Selection range is not collapsed delete the marked text
  if (!state.range.collapsed) {
    //deleteSelection(state);
  } else {
    const [rowIndex, fieldIndex] = deconstructFieldId(
      state.range.startContainer
    );
    const caretPosition = state.range.startOffset;
    const fieldValue = getFieldProp(state, rowIndex, fieldIndex, "value");

    if (caretPosition === fieldValue.length) {
      if (fieldIndex === state.rows[rowIndex].fields.length - 1) {
        if (rowIndex < state.rows.length - 1) {
          state.rows[rowIndex].fields.push(
            ...state.rows[rowIndex + 1].fields.splice(0)
          );
        }
      } else {
        mergeFields(state, rowIndex, fieldIndex);
      }
    } else {
      const newFieldValue =
        fieldValue.substring(0, caretPosition) +
        fieldValue.substring(caretPosition + 1);
      modifyFieldProp(state, rowIndex, fieldIndex, "value", newFieldValue);
    }
  }
  //Place caret
  placeCaret(state, targetRowIndex, targetFieldIndex, newCaretPosition);
};

export default handleDelete;
