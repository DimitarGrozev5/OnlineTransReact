import { readGroup } from "./dxfReadGroup";

// Read groups until you find the eneties section
export const goToEntities = (lines, pointer) => {
  const result = readGroup(lines, pointer);
  if (result.group[0] === 0 && result.group[1] === "SECTION") {
    const result1 = readGroup(result.lines, result.pointer);
    if (result1.group[1] === "ENTITIES") {
      return [result1.lines, result1.pointer];
    } else {
      return goToEntities(result.lines, result.pointer);
    }
  } else {
    return goToEntities(result.lines, result.pointer);
  }
};
