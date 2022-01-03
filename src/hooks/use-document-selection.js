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
      let anchorNode =
        selection.anchorNode &&
        (selection.anchorNode.nodeName === "#text"
          ? selection.anchorNode.parentElement.dataset.id
          : selection.anchorNode.dataset.id);

      //If one of the containers is undefined, both are stored as undefined
      //The container is undefined if nothing is selected
      //or if the target element doesn't have a data-id prop
      //If containers are undefined selection works as normal
      //If containers are fields in the box, selection becomes controlled
      //Hacky as hell
      anchorNode = startContainer && anchorNode;
      startContainer = endContainer && startContainer;
      endContainer = startContainer && endContainer;

      dispatch(
        inputDataActions.updateRange({
          anchorNode: anchorNode,
          startContainer: startContainer,
          endContainer: endContainer,
          startOffset,
          endOffset,
        })
      );
    };
    document.addEventListener("mouseup", selectionChangeHandler);

    return () => {
      document.removeEventListener("selectionchange", selectionChangeHandler);
    };
  }, [dispatch]);
};

export default useDocumentSelection;
