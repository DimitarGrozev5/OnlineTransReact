import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useApplySelection = () => {
  const range = useSelector((state) => state.inputData.range);
  const dispatch = useDispatch();

  useEffect(() => {
    ////Set window selection
    //Get active range
    const selection = window.getSelection();
    const activeRange = document.createRange();

    const notUndefined =
      range.startContainer &&
      range.endContainer &&
      range.startOffset !== undefined &&
      range.endOffset !== undefined;
    if (activeRange && notUndefined) {
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
    dispatch,
    range,
    range.startContainer,
    range.endContainer,
    range.startOffset,
    range.endOffset
  ]);
};

export default useApplySelection;
