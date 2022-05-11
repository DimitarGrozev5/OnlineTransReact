import { readGroup } from "../dxfReadGroup";
import { newDistanceMap } from "../dxfCreatePointMap";

export const readDistance = (dxfLines, pointer, x, y, targetCode) => {
  const readGroup_ = readGroup(dxfLines);
  const allPoints = [];

  let [code, value, nextPointer] = readGroup_(pointer);
  if (code === targetCode.toString()) {
    const lineIndex = nextPointer + 1;
    const val = +value;

    const ptMap = newDistanceMap(lineIndex, x, y, val);
    allPoints.push(ptMap);
  }

  while (code !== "0" && nextPointer) {
    [code, value, nextPointer] = readGroup_(nextPointer);
    if (code === targetCode.toString()) {
      const lineIndex = nextPointer + 1;
      const val = +value;

      const ptMap = newDistanceMap(lineIndex, x, y, val);
      allPoints.push(ptMap);
    }
  }
  return allPoints;
};
