const appStateReducer = (prevState, action) => {
  if (action.type === "UPDATE_INPUT_CS") {
    return {
      ...prevState,
      selectedInputCS: action.value,
      selectedInputVariantCS: action.value === "bgs" ? "cad" : null,
    };
  }
  if (action.type === "UPDATE_INPUT_VARIANT_CS") {
    return {
      ...prevState,
      selectedInputVariantCS: action.value,
    };
  }
  if (action.type === "UPDATE_INPUT_HS") {
    return {
      ...prevState,
      selectedInputHS: action.value,
    };
  }

  if (action.type === "UPDATE_OUTPUT_CS") {
    return {
      ...prevState,
      selectedOutputCS: action.value,
      selectedOutputVariantCS: null,
    };
  }
  if (action.type === "UPDATE_OUTPUT_VARIANT_CS") {
    return {
      ...prevState,
      selectedOutputVariantCS: action.value,
    };
  }
  if (action.type === "UPDATE_OUTPUT_HS") {
    return {
      ...prevState,
      selectedOutputHS: action.value,
    };
  }
  //Input field actions
  if (action.type === "UPDATE_SELECTION") {
    return {
      ...prevState,
      range: {
        startContainer: action.value.startContainer,
        startOffset: action.value.startOffset,
        endContainer: action.value.endContainer,
        endOffset: action.value.endOffset,
      },
    };
  }

  return prevState;
};

export default appStateReducer;
