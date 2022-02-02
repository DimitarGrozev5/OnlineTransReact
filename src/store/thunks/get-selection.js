import { inputDataActions } from "../input-data";

const getSelectionThunk =
  (textAreaRef, nextAction) => (dispatch, getState) => {
    //Get selection and update context
    const selection = window.getSelection();
    let anchorNode = selection && selection.anchorNode;
    let anchorOffset = selection && selection.anchorOffset;

    let { startContainer, endContainer, startOffset, endOffset } =
      selection && selection.rangeCount && selection.getRangeAt(0);

    if (!startContainer || !endContainer || !anchorNode) {
      dispatch(
        inputDataActions.updateRange({
          anchorNode: undefined,
          anchorOffset: undefined,
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
          anchorOffset: undefined,
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
        anchorOffset,
        startContainer: startContainer,
        endContainer: endContainer,
        startOffset,
        endOffset,
      })
    );
    dispatch(nextAction());
  };

export default getSelectionThunk;
