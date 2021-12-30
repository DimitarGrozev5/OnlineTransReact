//Helper function that deconstructs a field id from String RowIndex-FieldIndex, to tuple [RowIndex, FieldIndex]
export const deconstructFieldId = (fieldId) => {
  return fieldId.split("-").map((e) => +e);
};

//Helper function that constructs a field id
export const constructFieldId = (rowIndex, fieldIndex) =>
  `${rowIndex}-${fieldIndex}`;
