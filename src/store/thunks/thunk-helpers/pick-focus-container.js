const pickFocusContainer = (state) => {
  let focusContainer = state.range.startContainer;
  let focusOffset = state.range.startOffset;
  if (
    state.range.startContainer === state.range.anchorNode &&
    state.range.startOffset === state.range.anchorOffset
  ) {
    focusContainer = state.range.endContainer;
    focusOffset = state.range.endOffset;
  }
  return [focusContainer, focusOffset];
};

export default pickFocusContainer;
