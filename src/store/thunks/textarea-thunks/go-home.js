import {
  constructFieldId,
  deconstructFieldId,
} from "../../helpers/deconstruct-id";
import { inputDataActions } from "../../inputDataSlice";

const goHomeThunk = () => (dispatch, getState) => {
  const range = getState().inputData.range;
  const startContainer =
    range.startContainer && deconstructFieldId(range.startContainer);

  if (startContainer) {
    const targetNode = constructFieldId(startContainer[0], 0);
    dispatch(
      inputDataActions.updateRange({
        anchorNode: targetNode,
        anchorOffset: 0,
        focusNode: targetNode,
        focusOffset: 0,
        startContainer: targetNode,
        startOffset: 0,
        endContainer: targetNode,
        endOffset: 0,
      })
    );
  }
};

export default goHomeThunk;
