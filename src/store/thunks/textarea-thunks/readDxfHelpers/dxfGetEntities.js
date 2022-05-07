import { readGroup } from "./dxfReadGroup";
import { getPointerToEntitiesSection } from "./dxfPointerToEntetiesSection";

export const getEntities = (dxfLines) => {
  const readGroup_ = readGroup(dxfLines);

  const pointerToEntities = getPointerToEntitiesSection(dxfLines)(-2);
  const entities = [];

  let [code, value, pointer] = readGroup_(pointerToEntities);
  if (code === "0" && value !== "ENDSEC") {
    entities.push(pointer);
  }

  while (value !== "ENDSEC") {
    [code, value, pointer] = readGroup_(pointer);
    if (code === "0" && value !== "ENDSEC") {
      entities.push(pointer);
    }
  }

  return entities;
};
