import { useContext, useEffect } from "react";
import SystemsContext from "../store/systems-context";

const useDocumentSelection = () => {
  const ctx = useContext(SystemsContext);
  useEffect(() => {
    const selectionChangeHandler = () => {
      //Get selection and update context
      const selection = window.getSelection();
      let { startContainer, endContainer, startOffset, endOffset } =
        selection && selection.rangeCount && selection.getRangeAt(0);
      startContainer =
        startContainer.nodeName === "#text"
          ? startContainer.parentElement
          : startContainer;
      endContainer =
        endContainer.nodeName === "#text"
          ? endContainer.parentElement
          : endContainer;
      ctx.updateRange({
        startContainer,
        endContainer,
        startOffset,
        endOffset,
      });
    };
    document.addEventListener("selectionchange", selectionChangeHandler);

    //Set window selection
    const selection = window.getSelection();
    const activeRange =
      selection && selection.rangeCount && selection.getRangeAt(0);
    const ctxRange = ctx.inputData.range;
    const notUndefined =
      ctxRange.startContainer &&
      ctxRange.endContainer &&
      ctxRange.startOffset !== undefined &&
      ctxRange.endOffset !== undefined;
    if (activeRange && notUndefined) {
      activeRange.setStart(ctxRange.startContainer, ctxRange.startOffset);
      activeRange.setEnd(ctxRange.endContainer, ctxRange.endOffset);
      selection.removeAllRanges();
      selection.addRange(activeRange);
    }

    return () =>
      document.removeEventListener("selectionchange", selectionChangeHandler);
  }, [ctx]);
}

export default useDocumentSelection;