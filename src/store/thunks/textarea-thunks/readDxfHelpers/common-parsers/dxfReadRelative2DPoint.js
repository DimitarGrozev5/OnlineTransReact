import { readGroup } from "../dxfReadGroup";
import { newRelativePointMap } from "../dxfCreatePointMap";

export const readRelative2DPoint = (
  dxfLines,
  pointer,
  baseX,
  baseY,
  targetCode
) => {
  const readGroup_ = readGroup(dxfLines);
  const allPoints = [];

  let [code, value, nextPointer] = readGroup_(pointer);
  if (code === targetCode.toString()) {
    const xLineIndex = nextPointer + 1;
    const y = +value;
    [code, value, nextPointer] = readGroup_(nextPointer);
    const x = +value;
    // [code, value, nextPointer] = readGroup_(nextPointer);
    // const h = +value;

    const ptMap = newRelativePointMap(xLineIndex, baseX, baseY, x, y);
    allPoints.push(ptMap);
  }

  while (code !== "0" && nextPointer) {
    [code, value, nextPointer] = readGroup_(nextPointer);
    if (code === targetCode.toString()) {
      const xLineIndex = nextPointer + 1;
      const y = +value;
      [code, value, nextPointer] = readGroup_(nextPointer);
      const x = +value;
      // [code, value, nextPointer] = readGroup_(nextPointer);
      // const h = +value;

      const ptMap = newRelativePointMap(xLineIndex, baseX, baseY, x, y);
      allPoints.push(ptMap);
    }
  }
  return allPoints;
};
