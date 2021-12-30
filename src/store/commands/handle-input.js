import { deconstructFieldId } from "../helpers/deconstruct-id";
import modifyField from "./modify-field";

const handleInput = (state, action) => {
  let targetFieldId = deconstructFieldId(state.range.startContainer);

  //If the Selection range is not collapsed delete the marked text
  if (!state.range.collapsed) {
    //deleteSelection(state);
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
  state.range.startOffset += 1;
  state.range.endOffset += 1;
};

export default handleInput;
