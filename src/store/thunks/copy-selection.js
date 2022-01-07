import { deconstructFieldId } from "../helpers/deconstruct-id";
import { getFieldProp } from "../helpers/field-prop";

const copySelectionThunk = (then) => (dispatch, getState) => {
  const state = getState().inputData;
  const range = state.range;

  const [startRow, startField] = deconstructFieldId(range.startContainer);
  const startOffset = range.startOffset;
  const [endRow, endField] = deconstructFieldId(range.endContainer);
  const endOffset = range.endOffset;

  let output = "";

  // If the marked text is one field, copy the text and exit
  if (range.startContainer === range.endContainer) {
    output = getFieldProp(state, startRow, startField, "value").substring(
      startOffset,
      endOffset
    );
  }

  // If the marked text is in more than one field
  else {
    // If the startField and endField are on the same row
    if (startRow === endRow) {
      const outputArray = [];

      // Copy from first field
      outputArray.push(
        getFieldProp(state, startRow, startField, "value").substring(
          startOffset
        )
      );

      // Copy all fields from first field to last field
      const middleFields = state.rows[startRow].fields
        .slice(startField + 1, endField)
        .map((field) => field.value);
      outputArray.push(...middleFields);

      // Copy from last field
      outputArray.push(
        getFieldProp(state, endRow, endField, "value").substring(0, endOffset)
      );

      output = outputArray.join("\t");
    }

    // If the startField and endField are not on the same row
    else {
      const outputArray = [];

      let tmpRow = [];

      // Copy from first field
      tmpRow.push(
        getFieldProp(state, startRow, startField, "value").substring(
          startOffset
        )
      );

      // Copy all fields from first field to end of row
      tmpRow.push(
        ...state.rows[startRow].fields
          .slice(startField + 1)
          .map((field) => field.value)
      );

      // Add first row to output
      outputArray.push(tmpRow.join("\t"));

      // Loop trough every row between startRow and endRow and add them to the output
      outputArray.push(
        ...state.rows.slice(startRow + 1, endRow).map(({ fields }) => {
          return fields.map((field) => field.value).join("\t");
        })
      );

      // Copy the last row from the first field to the endField
      tmpRow = [
        ...state.rows[endRow].fields
          .slice(0, endField)
          .map((field) => field.value),
      ];

      // Copy from endRow
      tmpRow.push(
        getFieldProp(state, endRow, endField, "value").substring(0, endOffset)
      );

      // Add last row to output
      outputArray.push(tmpRow.join("\t"));

      // Join output array
      output = outputArray.join("\n");
    }
  }

  navigator.clipboard.writeText(output);

  if (then) {
    dispatch(then);
  }
};

export default copySelectionThunk;
