export const revertGroup = (pointer) => {
  if (pointer < 0) {
    return -2;
  }
  return pointer - 2;
};