import { constructFieldId } from "../helpers/deconstruct-id";
import { getFieldProp } from "../helpers/field-prop";
import { inputDataActions } from "../input-data";

const selectAllThunk = () => (dispatch, getState) => {
  const state = getState().inputData;

  const endRowIndex = state.rows.length - 1;
  const endFieldIndex = state.rows[endRowIndex].fields.length - 1;
  const endFieldLength = getFieldProp(
    state,
    endRowIndex,
    endFieldIndex,
    "value"
  ).length;

  dispatch(
    inputDataActions.updateRange({
      anchorNode: constructFieldId(0, 0),
      anchorOffset: 0,
      startContainer: constructFieldId(0, 0),
      startOffset: 0,
      endContainer: constructFieldId(endRowIndex, endFieldIndex),
      endOffset: endFieldLength,
    })
  );
};

export default selectAllThunk;
