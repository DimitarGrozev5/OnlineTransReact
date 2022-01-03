import { modifyFieldProp } from "../helpers/field-prop";
import { constructFieldId } from "../helpers/deconstruct-id";

//Move caret
const placeCaret = (state, rowIndex, fieldIndex, offset) => {
  modifyFieldProp(state, rowIndex, fieldIndex, "editable", true);
  state.range = {
    ...state.range,
    anchorNode: constructFieldId(rowIndex, fieldIndex),
    startContainer: constructFieldId(rowIndex, fieldIndex),
    endContainer: constructFieldId(rowIndex, fieldIndex),
    startOffset: offset,
    endOffset: offset,
    collapsed: true,
  };
};

export default placeCaret;
