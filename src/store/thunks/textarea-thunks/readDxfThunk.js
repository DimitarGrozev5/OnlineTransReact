const readGroup = (dxfLines) => (pointer) => {
  const [code, value] = [dxfLines[pointer + 2], dxfLines[pointer + 3]];

  if (value === "EOF") {
    return [code, value, null];
  }

  return [code, value, pointer + 2];
};

const revertGroup = (pointer) => {
  if (pointer < 0) {
    return -2;
  }
  return pointer - 2;
};

const getPointerToNextSection = (dxfLines) => (pointer) => {
  const readGroup_ = readGroup(dxfLines);

  let [code, value, nextPointer] = readGroup_(pointer);

  while ((code !== "0" || value !== "SECTION") && nextPointer) {
    [code, value, nextPointer] = readGroup_(nextPointer);
  }
  return nextPointer;
};

const getPointerToEntities = (dxfLines) => (pointer) => {
  const readGroup_ = readGroup(dxfLines);

  let nextSectionPointer = getPointerToNextSection(dxfLines)(-2);
  let [code, value, nextPointer] = readGroup_(nextSectionPointer);

  while (value !== "ENTITIES" && nextPointer) {
    nextSectionPointer = getPointerToNextSection(dxfLines)(nextPointer);
    [code, value, nextPointer] = readGroup_(nextSectionPointer);
  }

  return nextPointer;
};

const readDxfThunk = (dxfStr) => (dispatch, getState) => {
  const dxfLines = dxfStr.split(/\n\r|\r\n|\n|\r/).map((s) => s.trim());

  const pointerToEntities = getPointerToEntities(dxfLines)(-2);
  console.log(pointerToEntities);
};

export default readDxfThunk;
