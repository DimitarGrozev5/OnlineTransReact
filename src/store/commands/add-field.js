//////Add Field
////Inputs: row, before=null
////Outputs: field

import getField from "../helpers/get-field";

const addField = (state, rowIndex, beforeFieldIndex = null, value = "") => {
  const newField = getField(value);
  if (beforeFieldIndex === null) {
    state.rows[rowIndex].fields.push(newField);
  } else {
    state.rows[rowIndex].fields.splice(beforeFieldIndex, 0, newField);
  }
};

export default addField;
