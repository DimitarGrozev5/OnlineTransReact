import { original } from "@reduxjs/toolkit";

//Helper function that returns a tuple of [rowId, rowIndex, fieldIndex ] when given a field id
const getFieldSignature = (state, fieldId) => {
  return state.rows.reduce((rowResult, row, rowI) => {
    if (rowResult) {
      return rowResult;
    }
    return row.fields.reduce((fieldResult, field, fieldI) => {
      if (fieldResult) {
        return fieldResult;
      }
      if (field.id === fieldId) {
        return [row.id, rowI, fieldI];
      }
      return null;
    }, null);
  }, null);
};

export default getFieldSignature;
