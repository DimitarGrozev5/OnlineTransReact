import { getFieldProp, modifyFieldProp } from "../helpers/field-prop";
import getFieldSignature from "../helpers/get-field-signature";
import addField from "./add-field";

//////Split field
////Input: field, split position
////Output: new field
////
////Actions:
//Copy text from split position to end of field
//{Modify field}(field, "", split position, null)
//{Add field}{field.parentNode, field.nextSibling}
//{Modify field}(new field, copied text, 0, 0)
//Return new field
const splitField = (state, fieldId, splitIndex, fieldSignature = null) => {
  const [rowId, rowIndex, fieldIndex] =
    fieldSignature || getFieldSignature(state, fieldId);

  const fieldValue = getFieldProp(state, rowIndex, fieldIndex, "value");
  const newFieldValue = fieldValue.substring(splitIndex);

  modifyFieldProp(
    state,
    rowIndex,
    fieldIndex,
    "value",
    fieldValue.substring(0, splitIndex)
  );

  addField(state, rowIndex, fieldIndex + 1);
  modifyFieldProp(state, rowIndex, fieldIndex + 1, "value", newFieldValue);
  return [rowId, rowIndex, fieldIndex + 1];
};

export default splitField;
