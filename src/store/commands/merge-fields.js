import { getFieldProp } from "../helpers/field-prop";
import modifyField from "./modify-field";
import getFieldSignature from "../helpers/get-field-signature";

//////Merge fields
////Inputs: field1, field2
////Output: field1?
////
////Actions:
//{Modify field}(field1, field2.innerText, end of field1.innerText, null)
//Remove field2
//Return field1?
const mergeFields = (state, startFieldId, startFieldSignature = null) => {
  const [startRowId, startRowIndex, startFieldIndex] =
    startFieldSignature || getFieldSignature(state, startFieldId);

  const startFieldValue = getFieldProp(
    state,
    startRowIndex,
    startFieldIndex,
    "value"
  );
  const endFieldValue = getFieldProp(
    state,
    startRowIndex,
    startFieldIndex + 1,
    "value"
  );
  state.rows[startRowIndex].fields.splice(startFieldIndex + 1, 1);
  modifyField(
    state,
    [startRowId, startRowIndex, startFieldIndex],
    startFieldId,
    endFieldValue,
    startFieldValue.length
  );
};

export default mergeFields;
