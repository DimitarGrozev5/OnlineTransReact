import { deconstructFieldId } from "../helpers/deconstruct-id";
import splitField from "./split-field";
//import deleteSelection from "./delete-selection";
import addRow from "./add-row";
import placeCaret from "./place-caret";

const handleEnter = (state) => {
  //If the Selection range is not collapsed delete the marked text
  if (!state.range.collapsed) {
    //deleteSelection(state);
  }

  //Split the current field
  const [rowIndex, fieldIndex] = deconstructFieldId(state.range.startContainer);
  const targetSplitIndex = state.range.startOffset;
  splitField(state, rowIndex, fieldIndex, targetSplitIndex);

  //Add a new row and move all fields to it
  addRow(state, rowIndex + 1);
  state.rows[rowIndex + 1].fields = state.rows[rowIndex].fields.splice(
    fieldIndex + 1
  );

  //Move caret
  placeCaret(state, rowIndex + 1, 0, 0);
};

export default handleEnter;
