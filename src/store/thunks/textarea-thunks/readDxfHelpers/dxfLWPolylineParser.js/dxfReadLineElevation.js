import { readGroup } from "../dxfReadGroup";
import { newPointMap } from "../dxfCreatePointMap";

export const readLineElevation = (dxfLines, pointer) => (x, y) => {
  const readGroup_ = readGroup(dxfLines);
  let [code, value, nextPointer] = readGroup_(pointer);
  if (code === "38") {
    const ptMap = newPointMap(nextPointer + 1, +x, +y, value, true);
    return [ptMap];
  }
  while (code !== 0 && nextPointer) {
    [code, value, nextPointer] = readGroup_(nextPointer);
    if (code === "38") {
      const ptMap = newPointMap(nextPointer + 1, +x, +y, value, true);
      return [ptMap];
    }
  }
  return [];
};
