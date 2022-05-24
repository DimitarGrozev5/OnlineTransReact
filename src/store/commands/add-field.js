//////Add Field

const addField = (state, rowIndex, beforeFieldIndex = null, value = "") => {
  if (beforeFieldIndex === null) {
    state.data[rowIndex].push(value);
  } else {
    state.data[rowIndex].splice(beforeFieldIndex, 0, value);
  }
};

export default addField;
