//import deleteSelection from "./delete-selection";
import { deconstructFieldId } from "../helpers/deconstruct-id";
import splitField from "./split-field";
import placeCaret from "./place-caret";

const handleDivider = (state) => {
  //If the Selection range is not collapsed delete the marked text
  if (!state.range.collapsed) {
    //deleteSelection(state);
  }

  const [rowIndex, fieldIndex] = deconstructFieldId(state.range.startContainer);
  const targetSplitIndex = state.range.startOffset;

  splitField(state, rowIndex, fieldIndex, targetSplitIndex);

  //Move caret
  placeCaret(state, rowIndex, fieldIndex + 1, 0);
};

export default handleDivider;
