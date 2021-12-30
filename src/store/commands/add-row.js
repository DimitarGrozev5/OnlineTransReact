import { getRow } from "../input-data";

const addRow = (state, beforeRowIndex = null) => {
  //Create new row object
  const newRow = getRow();

  //If atIndex is null, the place the row at the end of the state.rows array
  if (beforeRowIndex === null) {
    beforeRowIndex = state.rows.length;
  }

  //Insert the new row
  state.rows.splice(beforeRowIndex, 0, newRow);

  //Return the new row id
  return beforeRowIndex;
};

export default addRow;