import { readGroup } from "../dxfReadGroup";
import { newPointMap } from "../dxfCreatePointMap";

export const read3DVertecies = (dxfLines, pointer, baseCode = 10) => {
  const readGroup_ = readGroup(dxfLines);
  const allPoints = [];

  let [code, value, nextPointer] = readGroup_(pointer);
  if (code == baseCode) {
    const xLineIndex = nextPointer;
    const y = +value;
    [code, value, nextPointer] = readGroup_(nextPointer);
    const x = +value;
    [code, value, nextPointer] = readGroup_(nextPointer);
    const h = +value;

    const ptMap = newPointMap(xLineIndex, x, y, h);
    allPoints.push(ptMap);
  }

  while (code !== "0" && nextPointer) {
    [code, value, nextPointer] = readGroup_(nextPointer);
    if (code == baseCode) {
      const xLineIndex = nextPointer + 1;
      const y = +value;
      [code, value, nextPointer] = readGroup_(nextPointer);
      const x = +value;
      [code, value, nextPointer] = readGroup_(nextPointer);
      const h = +value;

      const ptMap = newPointMap(xLineIndex, x, y, h);
      allPoints.push(ptMap);
    }
  }
  return allPoints;
};
