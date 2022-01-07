import { deconstructFieldId } from "../helpers/deconstruct-id";
import { getFieldProp, modifyFieldProp } from "../helpers/field-prop";
import getField from "../helpers/get-field";
import deleteSelection from "./delete-selection";

const handlePaste = (parsedData) => (state) => {
  //If the Selection range is not collapsed delete the marked text
  if (!state.range.collapsed) {
    deleteSelection(state);
  }

  // Get range values
  const [startRow, startField] = deconstructFieldId(state.range.startContainer);
  const startOffset = state.range.startOffset;
  const [endRow, endField] = deconstructFieldId(state.range.endContainer);
  const endOffset = state.range.endOffset;

  // Save fields from startField to end of row
  const tailFields = state.rows[startRow].fields.splice(startField + 1);

  
};

export default handlePaste;
