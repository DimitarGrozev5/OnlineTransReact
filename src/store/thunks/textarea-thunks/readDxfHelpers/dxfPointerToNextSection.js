import { readGroup } from "./dxfReadGroup";

export const getPointerToNextSection = (dxfLines) => (pointer) => {
  const readGroup_ = readGroup(dxfLines);

  let [code, value, nextPointer] = readGroup_(pointer);

  while ((code !== "0" || value !== "SECTION") && nextPointer) {
    [code, value, nextPointer] = readGroup_(nextPointer);
  }
  return nextPointer;
};
