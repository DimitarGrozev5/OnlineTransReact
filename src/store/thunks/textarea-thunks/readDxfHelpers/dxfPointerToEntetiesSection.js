import { readGroup } from "./dxfReadGroup";
import { getPointerToNextSection } from "./dxfPointerToNextSection";

export const getPointerToEntitiesSection = (dxfLines) => () => {
  const readGroup_ = readGroup(dxfLines);

  let nextSectionPointer = getPointerToNextSection(dxfLines)(-2);
  let [code, value, nextPointer] = readGroup_(nextSectionPointer);

  while (value !== "ENTITIES" && nextPointer) {
    nextSectionPointer = getPointerToNextSection(dxfLines)(nextPointer);
    [code, value, nextPointer] = readGroup_(nextSectionPointer);
  }

  return nextPointer;
};
