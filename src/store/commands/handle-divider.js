import { deconstructFieldId, constructFieldId } from "../helpers/deconstruct-id";
import splitField from "./split-field";
import placeCaret from "./place-caret";
import deleteSelection from "./delete-selection";

const handleDivider = (state) => {
  //If the Selection range is not collapsed delete the marked text
  if (!state.range.collapsed) {
    deleteSelection(state);
  }

  const [rowIndex, fieldIndex] = deconstructFieldId(state.range.startContainer);
  const targetSplitIndex = state.range.startOffset;

  splitField(state, rowIndex, fieldIndex, targetSplitIndex);

  //Move caret
  state.range = {
    ...state.range,
    anchorNode: constructFieldId(rowIndex, fieldIndex + 1),
    startContainer: constructFieldId(rowIndex, fieldIndex + 1),
    endContainer: constructFieldId(rowIndex, fieldIndex + 1),
    startOffset: 0,
    endOffset: 0,
    collapsed: true,
  };
};

export default handleDivider;
