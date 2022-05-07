export const readGroup = (dxfLines) => (pointer) => {
  const [code, value] = [dxfLines[pointer + 2], dxfLines[pointer + 3]];

  if (value === "EOF") {
    return [code, value, null];
  }

  return [code, value, pointer + 2];
};