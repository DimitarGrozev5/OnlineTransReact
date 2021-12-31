import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deconstructFieldId } from "../store/helpers/deconstruct-id";
import { getFieldProp } from "../store/helpers/field-prop";
import { inputDataActions } from "../store/input-data";

const useApplySelection = () => {
  const range = useSelector((state) => state.inputData.range);
  const inputData = useSelector((state) => state.inputData);
  const dispatch = useDispatch();

  useEffect(() => {
    ////Set window selection
    //Get active range
    const selection = window.getSelection();
    const activeRange =
      selection && selection.rangeCount && selection.getRangeAt(0);

    const notUndefined =
      range.startContainer &&
      range.endContainer &&
      range.startOffset !== undefined &&
      range.endOffset !== undefined;
    if (activeRange && notUndefined) {
      //If the range is collapsed, the coresponding field should be made editable
      const fieldIsEditable = getFieldProp(
        inputData,
        ...deconstructFieldId(range.startContainer),
        "editable"
      );
      if (range.collapsed && !fieldIsEditable) {
        dispatch(
          inputDataActions.makeFieldEditable({
            fieldId: range.startContainer,
          })
        );
        return;
      }

      const startContainer = document.getElementById(range.startContainer);
      const endContainer = document.getElementById(range.endContainer);

      activeRange.setStart(
        startContainer.firstChild || startContainer,
        range.startOffset
      );
      activeRange.setEnd(
        endContainer.firstChild || endContainer,
        range.endOffset
      );
      selection.removeAllRanges();
      selection.addRange(activeRange);
    }
  }, [
    range,
    range.startContainer,
    range.endContainer,
    range.startOffset,
    range.endOffset,
    inputData
  ]);
};

export default useApplySelection;
