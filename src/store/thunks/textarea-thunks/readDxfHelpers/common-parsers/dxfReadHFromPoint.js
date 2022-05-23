import { readGroup } from "../dxfReadGroup";
import { newHPointMap } from "../dxfCreatePointMap";

export const readHFromPoint = (dxfLines, pointer, x, y, baseCode = 10) => {
  const readGroup_ = readGroup(dxfLines);
  const allPoints = [];

  let [code, value, nextPointer] = readGroup_(pointer);
  if (code === baseCode.toString()) {
    [code, value, nextPointer] = readGroup_(nextPointer);
    [code, value, nextPointer] = readGroup_(nextPointer);
    const xLineIndex = nextPointer + 1;
    const h = +value;

    const ptMap = newHPointMap(xLineIndex, x, y, h);
    allPoints.push(ptMap);
  }

  while (code !== "0" && nextPointer) {
    [code, value, nextPointer] = readGroup_(nextPointer);
    if (code === baseCode.toString()) {
      [code, value, nextPointer] = readGroup_(nextPointer);
      [code, value, nextPointer] = readGroup_(nextPointer);
      const xLineIndex = nextPointer + 1;
      const h = +value;

      const ptMap = newHPointMap(xLineIndex, x, y, h);
      allPoints.push(ptMap);
    }
  }
  return allPoints;
};
