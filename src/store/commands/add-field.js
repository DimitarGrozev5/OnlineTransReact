//////Add Field
////Inputs: row, before=null
////Outputs: field

import getField from "../helpers/get-field";

const addField = (state, rowIndex, beforeFieldIndex = null) => {
  if (beforeFieldIndex === null) {
    beforeFieldIndex = state.rows[rowIndex].length;
  }
  const newField = getField();
  state.rows[rowIndex].fields.splice(beforeFieldIndex, 0, newField);
  return newField.id;
};

export default addField;
