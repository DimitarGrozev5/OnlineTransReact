import { constructFieldId } from "../helpers/deconstruct-id";

//Move caret
const placeCaret = (state, rowIndex, fieldIndex, offset) => {
  state.range = {
    ...state.range,
    anchorNode: constructFieldId(rowIndex, fieldIndex),
    anchorOffset: offset,
    focusNode: constructFieldId(rowIndex, fieldIndex),
    focusOffset: offset,
    startContainer: constructFieldId(rowIndex, fieldIndex),
    endContainer: constructFieldId(rowIndex, fieldIndex),
    startOffset: offset,
    endOffset: offset,
    collapsed: true,
  };
};

export default placeCaret;
