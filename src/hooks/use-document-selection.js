import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { inputDataActions } from "../store/input-data";
import { dragHasHappened } from "./use-mouse-events";

const useDocumentSelection = (textAreaRef, callerName) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const selectionChangeHandler = (event) => {
      //Get selection and update context
      const selection = window.getSelection();
      let anchorNode = selection && selection.anchorNode;

      let { startContainer, endContainer, startOffset, endOffset } =
        selection && selection.rangeCount && selection.getRangeAt(0);

      if (!startContainer || !endContainer || !anchorNode) {
        dispatch(
          inputDataActions.updateRange({
            anchorNode: undefined,
            startContainer: undefined,
            endContainer: undefined,
            startOffset: undefined,
            endOffset: undefined,
          })
        );
        return;
      }

      //If the TextArea is not a parent to the node set Range to undefined
      if (
        !textAreaRef.current.contains(startContainer) ||
        !textAreaRef.current.contains(endContainer)
      ) {
        dispatch(
          inputDataActions.updateRange({
            anchorNode: undefined,
            startContainer: undefined,
            endContainer: undefined,
            startOffset: undefined,
            endOffset: undefined,
          })
        );
        return;
      }

      //Get the target field id from the start/end container
      //If the container is empty then the pointer will return the div
      //If the container is not empty the pointer will return the inner text node
      //For this reason nodeName is checked, so the dataset prop is accessed properly
      startContainer =
        startContainer.nodeName === "#text"
          ? startContainer.parentElement.dataset.id
          : startContainer.dataset.id;
      endContainer =
        endContainer.nodeName === "#text"
          ? endContainer.parentElement.dataset.id
          : endContainer.dataset.id;
      anchorNode =
        anchorNode.nodeName === "#text"
          ? anchorNode.parentElement.dataset.id
          : anchorNode.dataset.id;

      //If one of the containers is undefined, all are stored as undefined
      //The container is undefined if nothing is selected
      //or if the target element doesn't have a data-id prop,
      //i.e. is not a part of the TextArea
      anchorNode = startContainer && anchorNode;
      startContainer = endContainer && startContainer;
      endContainer = startContainer && endContainer;

      // console.log({
      //   anchorNode: anchorNode,
      //   startContainer: startContainer,
      //   endContainer: endContainer,
      //   startOffset,
      //   endOffset,
      // })

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
    //document.addEventListener("mouseup", selectionChangeHandler);

    // The following weirdness is cost by a kink in the normal flow of DOM Events
    // The usual firing flow is:
    // mousedown -> selectionchange -> mouseup
    // When the user marks some text and then tries to click on in the firing flow is changed to:
    // mousedown -> mouseup -> selectionchange
    // I believe this change is made so as to make a drag event possible
    //
    // The issue is that if I append the range update to the mouseup event, then in some cases the update will not happen
    // because the range chages after the mouseup event
    //
    // I could of course append the range update to the selectionchange event but that leads to too many store updates
    // and subsequent component updates
    //
    //That is why I have decided to go to the dumb combination of outside scoped variables and event listeners

    let mouseIsUp = false;
    let mouseUpEvent = undefined;
    let selectionChanged = false;

    const selectionChangeListener = () => {
      if (mouseIsUp) {
        selectionChangeHandler(mouseUpEvent);
        document.removeEventListener(
          "selectionchange",
          selectionChangeListener
        );
      } else {
        selectionChanged = true;
      }
    };
    const startSelectionchangeListener = () => {
      mouseIsUp = false;
      mouseUpEvent = undefined;
      selectionChanged = false;
      document.addEventListener("selectionchange", selectionChangeListener);
    };
    const mouseUpHandler = (event) => {
      mouseIsUp = true;
      mouseUpEvent = event;
      if (selectionChanged) {
        selectionChangeHandler(event);
        document.removeEventListener(
          "selectionchange",
          selectionChangeListener
        );
      }
    };

    document.addEventListener("mousedown", startSelectionchangeListener);
    document.addEventListener("mouseup", mouseUpHandler);

    // document.addEventListener("mousedown", ()=>console.log("mousedown"));
    // document.addEventListener("mouseup", ()=>console.log("mouseup"));
    // document.addEventListener("click", ()=>console.log("click"));
    // document.addEventListener("selectionchange", ()=>console.log("selectionchange"));
    // document.addEventListener("dragstart", ()=>console.log("dragstart"));

    return () => {
      // document.removeEventListener("mouseup", selectionChangeHandler);
      document.removeEventListener("mousedown", startSelectionchangeListener);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [dispatch, textAreaRef]);
};

export default useDocumentSelection;
