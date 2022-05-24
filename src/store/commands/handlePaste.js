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

const handlePaste = (parsedData, fileUpload) => (state) => {
  // If There is a file uploading do some prep
  if (fileUpload) {
    if (
      state.data.length === 1 &&
      state.data[0].length === 1 &&
      state.data[0][0].length === 0
    ) {
      state.range = {
        anchorNode: "0-0",
        anchorOffset: 0,
        focusNode: "0-0",
        focusOffset: 0,
        startContainer: "0-0",
        startOffset: 0,
        endContainer: "0-0",
        endOffset: 0,
        collapsed: true,
      };
    } else {
      state.data.push([""]);
      const id = constructFieldId(state.data.length - 1, 0);
      state.range = {
        anchorNode: id,
        anchorOffset: 0,
        focusNode: id,
        focusOffset: 0,
        startContainer: id,
        startOffset: 0,
        endContainer: id,
        endOffset: 0,
        collapsed: true,
      };
    }
  }

  //If the Selection range is not collapsed delete the marked text
  if (!state.range.collapsed) {
    deleteSelection(state);
  }

  // Get range values
  const [startRow, startField] = deconstructFieldId(state.range.startContainer);
  const startOffset = state.range.startOffset;
  let [endRow, endField] = [startRow, startField];
  //const endOffset = startOffset;

  if (startRow === state.data.length - 1) {
    endRow = null;
  }

  // Split first field
  splitField(state, startRow, startField, startOffset);

  // Save fields from startField to end of row
  const tailFields = state.data[startRow].splice(startField + 1);

  // Insert first row of paste data
  parsedData
    .shift()
    .forEach((fieldValue) => addField(state, startRow, null, fieldValue));

  // Insert rows of parsed data
  parsedData.forEach((parsedRow) => {
    addRow(state, endRow);
    parsedRow.forEach((fieldValue) => {
      const targetRow = endRow ? endRow + 1 : state.data.length - 1;
      addField(state, targetRow, null, fieldValue);
    });
    endRow && endRow++;
  });

  // Subtract one from endRow so as to point to the last inserted row
  endRow--;
  endRow = endRow < startRow ? startRow : endRow;
  endRow = endRow || state.data.length - 1;

  // Get the index of the last field of the inserted data
  endField = state.data[endRow].length - 1;

  // Append the tail Fields
  state.data[endRow].push(...tailFields);

  // Merge first field
  mergeFields(state, startRow, startField);

  // Merge last field
  if (endRow === startRow) {
    endField--;
  }
  // endField = Math.max(endField, 0);
  const offset = getFieldProp(state, endRow, endField).length;
  mergeFields(state, endRow, endField);

  // Set range
  state.range = {
    anchorNode: constructFieldId(endRow, endField),
    anchorOffset: offset,
    focusNode: constructFieldId(endRow, endField),
    focusOffset: offset,
    startContainer: constructFieldId(endRow, endField),
    startOffset: offset,
    endContainer: constructFieldId(endRow, endField),
    endOffset: offset,
    collapsed: true,
  };
};

export default handlePaste;
