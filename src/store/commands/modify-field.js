import { getFieldProp, modifyFieldProp } from "../helpers/field-prop";

//////Modify Field
////Inputs: field, new text, position start, position end
////Outputs: field?
////
////Actions:
//field.innerText = field.innerText.substring(0, position start) + new text + field.innerText.substring(position end, string end)
const modifyField = (state, rowIndex, fieldIndex, newText, positionIndex) => {
  let fieldValue = getFieldProp(state, rowIndex, fieldIndex);
  fieldValue = `${fieldValue.substring(
    0,
    positionIndex
  )}${newText}${fieldValue.substring(positionIndex)}`;

  modifyFieldProp(state, rowIndex, fieldIndex, fieldValue);
};

export default modifyField;
