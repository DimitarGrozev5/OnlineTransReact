import {
  constructFieldId,
  deconstructFieldId,
} from "../../helpers/deconstruct-id";
import { inputDataActions } from "../../inputDataSlice";

const goToEndThunk = () => (dispatch, getState) => {
  const range = getState().inputData.range;
  const endContainer =
    range.endContainer && deconstructFieldId(range.endContainer);

  if (endContainer) {
    const lastField = getState().inputData.data[endContainer[0]].length - 1;
    const lastOffset =
      getState().inputData.data[endContainer[0]][lastField].length;
    const targetNode = constructFieldId(endContainer[0], lastField);
    dispatch(
      inputDataActions.updateRange({
        anchorNode: targetNode,
        anchorOffset: lastOffset,
        focusNode: targetNode,
        focusOffset: lastOffset,
        startContainer: targetNode,
        startOffset: lastOffset,
        endContainer: targetNode,
        endOffset: lastOffset,
      })
    );
  }
};

export default goToEndThunk;
