import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { inputDataActions } from "../store/input-data";

const useDocumentSelection = () => {
  // const ctxRange = useSelector((state) => state.inputData.range);
  const dispatch = useDispatch();

  useEffect(() => {
    const selectionChangeHandler = () => {
      //Get selection and update context
      const selection = window.getSelection();
      let { startContainer, endContainer, startOffset, endOffset } =
        selection && selection.rangeCount && selection.getRangeAt(0);

      //Get the target field id from the start/end container
      startContainer =
        startContainer &&
        (startContainer.nodeName === "#text"
          ? startContainer.parentElement.dataset.id
          : startContainer.dataset.id);
      endContainer =
        endContainer &&
        (endContainer.nodeName === "#text"
          ? endContainer.parentElement.dataset.id
          : endContainer.dataset.id);
      //If one of the containers is undefined, both are stored as undefined
      //The container is undefined if nothing is selected
      //or if the target element doesn't have a data-id prop
      //If containers are undefined selection works as normal
      //If containers are fields in the bos, selection becomes controlled
      //Hacky as hell
      startContainer = endContainer && startContainer;
      endContainer = startContainer && endContainer;

      dispatch(
        inputDataActions.updateRange({
          startContainer: startContainer,
          endContainer: endContainer,
          startOffset,
          endOffset,
        })
      );
    };
    document.addEventListener("selectionchange", selectionChangeHandler);

    ////Set window selection
    //Get active range
    // const selection = window.getSelection();
    // const activeRange =
    //   selection && selection.rangeCount && selection.getRangeAt(0);

    // const notUndefined =
    //   ctxRange.startContainer &&
    //   ctxRange.endContainer &&
    //   ctxRange.startOffset !== undefined &&
    //   ctxRange.endOffset !== undefined;
    // if (activeRange && notUndefined) {
    //   const startContainer = document.getElementById(ctxRange.startContainer);
    //   const endContainer = document.getElementById(ctxRange.endContainer);

    //   activeRange.setStart(startContainer, ctxRange.startOffset);
    //   activeRange.setEnd(endContainer, ctxRange.endOffset);
    //   selection.removeAllRanges();
    //   selection.addRange(activeRange);
    // }

    return () =>
      document.removeEventListener("selectionchange", selectionChangeHandler);
  }, [
    dispatch//,
    // ctxRange.startContainer,
    // ctxRange.endContainer,
    // ctxRange.startOffset,
    // ctxRange.endOffset,
  ]);
};

export default useDocumentSelection;
