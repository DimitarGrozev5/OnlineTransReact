import {
  constructFieldId,
  deconstructFieldId,
} from "../helpers/deconstruct-id";
import { getFieldProp } from "../helpers/field-prop";
import addField from "./add-field";
import addRow from "./add-row";
import deleteSelection from "./delete-selection";
import mergeFields from "./merge-fields";
import splitField from "./split-field";

const handlePaste = (parsedData) => (state) => {
  //If the Selection range is not collapsed delete the marked text
  if (!state.range.collapsed) {
    deleteSelection(state);
  }

  // Get range values
  const [startRow, startField] = deconstructFieldId(state.range.startContainer);
  const startOffset = state.range.startOffset;
  let [endRow, endField] = [startRow, startField];
  //const endOffset = startOffset;

  if (startRow === state.rows.length - 1) {
    endRow = null;
  }

  // Split first field
  splitField(state, startRow, startField, startOffset);

  // Save fields from startField to end of row
  const tailFields = state.rows[startRow].fields.splice(startField + 1);

  // Insert first row of paste data
  parsedData
    .shift()
    .forEach((fieldValue) => addField(state, startRow, null, fieldValue));

  // Insert rows of parsed data
  parsedData.forEach((parsedRow) => {
    addRow(state, endRow);
    parsedRow.forEach((fieldValue) => {
      const targetRow = endRow ? endRow + 1 : state.rows.length - 1
      addField(state, targetRow, null, fieldValue);
    });
    endRow && endRow++;
  });

  // Subtract one from endRow so as to point to the last inserted row
  endRow--;
  endRow = endRow < startRow ? startRow : endRow;
  endRow = endRow || state.rows.length - 1;

  // Get the index of the last field of the inserted data
  endField = state.rows[endRow].fields.length - 1;

  // Append the tail Fields
  state.rows[endRow].fields.push(...tailFields);

  // Merge first field
  mergeFields(state, startRow, startField);

  // Merge last field
  // console.log(startRow)
  // console.log(endRow)
  if (endRow === startRow) {
    endField--;
  }
  // endField = Math.max(endField, 0);
  const offset = getFieldProp(state, endRow, endField, "value").length;
  mergeFields(state, endRow, endField);

  // Set range
  state.range = {
    anchorNode: constructFieldId(endRow, endField),
    anchorOffset: offset,
    startContainer: constructFieldId(endRow, endField),
    startOffset: offset,
    endContainer: constructFieldId(endRow, endField),
    endOffset: offset,
    collapsed: true,
  };
};

export default handlePaste;
