import { constructFieldId } from "../../helpers/deconstruct-id";
import { getFieldProp } from "../../helpers/field-prop";
import { inputDataActions } from "../../inputDataSlice";

const selectAllThunk = () => (dispatch, getState) => {
  const state = getState().inputData;

  const endRowIndex = state.data.length - 1;
  const endFieldIndex = state.data[endRowIndex].length - 1;
  const endFieldLength = getFieldProp(
    state,
    endRowIndex,
    endFieldIndex
  ).length;

  dispatch(
    inputDataActions.updateRange({
      anchorNode: constructFieldId(0, 0),
      anchorOffset: 0,
      focusNode: constructFieldId(endRowIndex, endFieldIndex),
      focusOffset: endFieldLength,
      startContainer: constructFieldId(0, 0),
      startOffset: 0,
      endContainer: constructFieldId(endRowIndex, endFieldIndex),
      endOffset: endFieldLength,
    })
  );
};

export default selectAllThunk;
