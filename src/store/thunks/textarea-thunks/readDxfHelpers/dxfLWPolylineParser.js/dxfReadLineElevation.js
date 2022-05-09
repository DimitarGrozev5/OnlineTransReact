import { readGroup } from "../dxfReadGroup";
import { newHPointMap } from "../dxfCreatePointMap";

export const readLineElevation = (dxfLines, pointer) => (x, y) => {
  const readGroup_ = readGroup(dxfLines);
  let [code, value, nextPointer] = readGroup_(pointer);
  if (code === "38") {
    const ptMap = newHPointMap(nextPointer + 1, +x, +y, +value);
    return [ptMap];
  }
  while (code !== 0 && nextPointer) {
    [code, value, nextPointer] = readGroup_(nextPointer);
    if (code === "38") {
      const ptMap = newHPointMap(nextPointer + 1, +x, +y, +value);
      return [ptMap];
    }
  }
  return [];
};
