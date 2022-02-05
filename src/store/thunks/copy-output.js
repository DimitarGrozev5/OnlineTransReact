import { deconstructFieldId } from "../helpers/deconstruct-id";
import { getFieldProp } from "../helpers/field-prop";

const copyOutputSelectionThunk = () => (dispatch, getState) => {
  const data = getState().systems.transformedData;
  const selection = document.getSelection();
  const activeRange =
    selection && selection.rangeCount && selection.getRangeAt(0);

  const startContainer =
    activeRange.startContainer.nodeName === "#text"
      ? activeRange.startContainer.parentElement.dataset.id
      : activeRange.startContainer.dataset.id;
  const endContainer =
    activeRange.endContainer.nodeName === "#text"
      ? activeRange.endContainer.parentElement.dataset.id
      : activeRange.endContainer.dataset.id;

  const [startRow, startField] = deconstructFieldId(startContainer);
  const startOffset = activeRange.startOffset;
  const [endRow, endField] = deconstructFieldId(endContainer);
  const endOffset = activeRange.endOffset;

  let output = "";

  // If the marked text is one field, copy the text and exit
  if (activeRange.startContainer === activeRange.endContainer) {
    output = data[startRow][startField].toString().substring(startOffset, endOffset);
  }

  // If the marked text is in more than one field
  else {
    // If the startField and endField are on the same row
    if (startRow === endRow) {
      const outputArray = [];

      // Copy from first field
      outputArray.push(
        data[startRow][startField].toString().substring(startOffset)
      );

      // Copy all fields from first field to last field
      const middleFields = data[startRow].slice(startField + 1, endField);
      outputArray.push(...middleFields);

      // Copy from last field
      outputArray.push(
        data[endRow][endField].toString().substring(0, endOffset)
      );

      output = outputArray.join("\t");
    }

    // If the startField and endField are not on the same row
    else {
      const outputArray = [];

      let tmpRow = [];

      // Copy from first field
      tmpRow.push(
        data[startRow][startField].toString().substring(startOffset)
      );

      // Copy all fields from first field to end of row
      tmpRow.push(...data[startRow].slice(startField + 1));

      // Add first row to output
      outputArray.push(tmpRow.join("\t"));

      // Loop trough every row between startRow and endRow and add them to the output
      outputArray.push(
        ...data.slice(startRow + 1, endRow).map((row) => row.join("\t"))
      );

      // Copy the last row from the first field to the endField
      tmpRow = [...data[endRow].slice(0, endField)];

      // Copy from endRow
      tmpRow.push(data[endRow][endField].toString().substring(0, endOffset));

      // Add last row to output
      outputArray.push(tmpRow.join("\t"));

      // Join output array
      output = outputArray.join("\n");
    }
  }
  navigator.clipboard.writeText(output);
};

export default copyOutputSelectionThunk;
