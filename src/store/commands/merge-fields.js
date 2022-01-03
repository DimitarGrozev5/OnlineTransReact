import { getFieldProp } from "../helpers/field-prop";
import modifyField from "./modify-field";

//////Merge fields
////Inputs: field1, field2
////Output: field1?
////
////Actions:
//{Modify field}(field1, field2.innerText, end of field1.innerText, null)
//Remove field2
//Return field1?
const mergeFields = (state, rowIndex, startFieldIndex) => {
  const startFieldValue = getFieldProp(
    state,
    rowIndex,
    startFieldIndex,
    "value"
  );
  const endFieldValue = getFieldProp(
    state,
    rowIndex,
    startFieldIndex + 1,
    "value"
  );
  state.rows[rowIndex].fields.splice(startFieldIndex + 1, 1);
  modifyField(
    state,
    rowIndex,
    startFieldIndex,
    endFieldValue,
    startFieldValue.length
  );
};

export default mergeFields;
