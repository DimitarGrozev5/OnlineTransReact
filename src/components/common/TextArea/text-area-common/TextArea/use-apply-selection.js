import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useApplySelection = (dataSource) => {
  const range = useSelector((state) => state.inputData.range);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dataSource === "output") {
      return;
    }
    const selection = window.getSelection();
    const activeRange = document.createRange();

    const notUndefined =
      range.startContainer &&
      range.endContainer &&
      range.startOffset !== undefined &&
      range.endOffset !== undefined;
    if (activeRange && notUndefined) {
      const anchorNode = document.getElementById(range.anchorNode);
      const focusNode = document.getElementById(range.focusNode);

      activeRange.setStart(
        anchorNode.firstChild || anchorNode,
        range.anchorOffset
      );
      activeRange.setEnd(
        anchorNode.firstChild || anchorNode,
        range.anchorOffset
      );
      selection.removeAllRanges();
      selection.addRange(activeRange);
      selection.extend(focusNode.firstChild || focusNode, range.focusOffset);
    }
  }, [
    dispatch,
    range,
    range.startContainer,
    range.endContainer,
    range.startOffset,
    range.endOffset,
    dataSource,
  ]);
};

export default useApplySelection;
