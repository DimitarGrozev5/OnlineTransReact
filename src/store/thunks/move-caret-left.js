import {
  constructFieldId,
  deconstructFieldId,
} from "../helpers/deconstruct-id";
import { getFieldProp } from "../helpers/field-prop";
import { inputDataActions } from "../input-data";

const moveCaretLeftThunk = () => (dispatch, getState) => {
  const state = getState().inputData;
  const [rowIndex, fieldIndex] = deconstructFieldId(state.range.startContainer);

  //If the range is not collapsed, the collapse to start and exit
  if (!state.range.collapsed) {
    dispatch(
      inputDataActions.updateRange({
        anchorNode: state.range.startContainer,
        startContainer: state.range.startContainer,
        endContainer: state.range.startContainer,
        startOffset: state.range.startOffset,
        endOffset: state.range.startOffset,
        collapsed: true,
      })
    );
  } else {
    //If the caret position is not in the begining of the field, then move the caret one position left
    if (state.range.startOffset > 0) {
      dispatch(
        inputDataActions.updateRange({
          startOffset: state.range.startOffset - 1,
          endOffset: state.range.startOffset - 1,
        })
      );
    }
    //If the caret is in the beginning of the field, then move it to the previous field
    else if (state.range.startOffset === 0) {
      //If the field is not the first in the row, move the caret to it's last position
      if (fieldIndex > 0) {
        const prevFieldLength = getFieldProp(
          state,
          rowIndex,
          fieldIndex - 1,
          "value"
        ).length;
        dispatch(
          inputDataActions.updateRange({
            anchorNode: constructFieldId(rowIndex, fieldIndex - 1),
            startContainer: constructFieldId(rowIndex, fieldIndex - 1),
            endContainer: constructFieldId(rowIndex, fieldIndex - 1),
            startOffset: prevFieldLength,
            endOffset: prevFieldLength,
            collapsed: true,
          })
        );
      }
      //If the field is the first in the row, move the caret to the last position in the previous row
      else {
        //If there is a previous row, move the caret to there
        if (rowIndex > 0) {
          const prevFieldIndex = state.rows[rowIndex - 1].fields.length - 1;
          const prevFieldLength = getFieldProp(
            getState().inputData,
            rowIndex - 1,
            prevFieldIndex,
            "value"
          ).length;
          dispatch(
            inputDataActions.updateRange({
              anchorNode: constructFieldId(rowIndex - 1, prevFieldIndex),
              startContainer: constructFieldId(rowIndex - 1, prevFieldIndex),
              endContainer: constructFieldId(rowIndex - 1, prevFieldIndex),
              startOffset: prevFieldLength,
              endOffset: prevFieldLength,
              collapsed: true,
            })
          );
        }
        //If there is no previous row, do nothing
      }
    }
  }
};

export default moveCaretLeftThunk;
