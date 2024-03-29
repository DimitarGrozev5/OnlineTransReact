import { deconstructFieldId } from "../helpers/deconstruct-id";
import modifyField from "./modify-field";
import deleteSelection from "./delete-selection";
import placeCaret from "./place-caret";

const handleInput = (action) => (state) => {
  let targetFieldId = deconstructFieldId(state.range.startContainer);

  //If the Selection range is not collapsed delete the marked text
  if (!state.range.collapsed) {
    deleteSelection(state);
  }

  //Modify the value of the taret field
  modifyField(
    state,
    targetFieldId[0],
    targetFieldId[1],
    action.payload.key,
    state.range.startOffset
  );

  //Move carret
  placeCaret(
    state,
    targetFieldId[0],
    targetFieldId[1],
    state.range.startOffset + 1
  );
};

export default handleInput;
