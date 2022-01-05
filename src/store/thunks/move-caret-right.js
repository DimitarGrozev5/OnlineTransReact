import {
  constructFieldId,
  deconstructFieldId,
} from "../helpers/deconstruct-id";
import { getFieldProp } from "../helpers/field-prop";
import { inputDataActions } from "../input-data";

const moveCaretRightThunk = () => (dispatch, getState) => {
  const state = getState().inputData;
  const [rowIndex, fieldIndex] = deconstructFieldId(state.range.startContainer);

  //If the range is not collapsed, the collapse to end and exit
  if (!state.range.collapsed) {
    dispatch(
      inputDataActions.updateRange({
        anchorNode: state.range.endContainer,
        startContainer: state.range.endContainer,
        endContainer: state.range.endContainer,
        startOffset: state.range.endOffset,
        endOffset: state.range.endOffset,
        collapsed: true,
      })
    );
  } else {
    //If the caret position is not in the end of the field, then move the caret one position right
    const fieldLength = getFieldProp(
      state,
      rowIndex,
      fieldIndex,
      "value"
    ).length;
    if (state.range.startOffset < fieldLength) {
      dispatch(
        inputDataActions.updateRange({
          startOffset: state.range.startOffset + 1,
          endOffset: state.range.startOffset + 1,
        })
      );
    }
    //If the caret is in the end of the field, then move it to the next field
    else if (state.range.startOffset === fieldLength) {
      //If the caret is not the last field, move the caret to the next field's first position
      if (fieldIndex < state.rows[rowIndex].fields.length - 1) {
        dispatch(
          inputDataActions.updateRange({
            anchorNode: constructFieldId(rowIndex, fieldIndex + 1),
            startContainer: constructFieldId(rowIndex, fieldIndex + 1),
            endContainer: constructFieldId(rowIndex, fieldIndex + 1),
            startOffset: 0,
            endOffset: 0,
            collapsed: true,
          })
        );
      }
      //If the field is the last field, move the caret to the first position in the next row
      else {
        //If there is a next row, move the caret to there
        if (rowIndex < state.rows.length - 1) {
          dispatch(
            inputDataActions.updateRange({
              anchorNode: constructFieldId(rowIndex + 1, 0),
              startContainer: constructFieldId(rowIndex + 1, 0),
              endContainer: constructFieldId(rowIndex + 1, 0),
              startOffset: 0,
              endOffset: 0,
              collapsed: true,
            })
          );
        }
        //If there is no previous row, do nothing
      }
    }
  }
};

export default moveCaretRightThunk;
