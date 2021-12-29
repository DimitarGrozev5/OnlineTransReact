//Helper that modifies a field proeprty
export const modifyFieldProp = (state, rowIndex, fieldIndex, prop, value) => {
  state.rows[rowIndex].fields[fieldIndex][prop] = value;
};

//Helper that gets a field proeprty
export const getFieldProp = (state, rowIndex, fieldIndex, prop) => {
  return state.rows[rowIndex].fields[fieldIndex][prop];
};