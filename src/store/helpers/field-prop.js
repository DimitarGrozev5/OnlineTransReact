//Helper that modifies a field proeprty
export const modifyFieldProp = (state, rowIndex, fieldIndex, value) => {
  state.data[rowIndex][fieldIndex] = value;
};

//Helper that gets a field proeprty
export const getFieldProp = (state, rowIndex, fieldIndex) => {
  return state.data[rowIndex][fieldIndex];
};