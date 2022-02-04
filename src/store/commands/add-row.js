const addRow = (state, beforeRowIndex = null) => {
  //Create new row object
  const newRow = [];

  if (beforeRowIndex >= state.data.length) {
    beforeRowIndex = null;
  }

  //If atIndex is null, the place the row at the end of the state.rows array
  if (beforeRowIndex === null) {
    state.data.push(newRow);
  } else {
    //Insert the new row
    state.data.splice(beforeRowIndex, 0, newRow);
  }
  //Return the new row id
  return beforeRowIndex;
};

export default addRow;
