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
  if (action.type === "UPDATE_INPUT_FIELD") {
    let newInputData = prevState.inputData.map(row => {
      if (row.id === action.value.row) {
        row.fields = row.fields.map(field => {
          if (field.id === action.value.field) {
            field.value = action.value.value;
          }
          return {...field};
        })
      }
      return row
    })
    return {
      ...prevState,
      inputData: newInputData
    }
  }
  return prevState;
};

export default appStateReducer;
