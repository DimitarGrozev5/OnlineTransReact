import { readVertexes } from "./dxfReadVertexes";
import { readLineElevation } from "./dxfReadLineElevation";

export const readLWPolyline = (dxfLines, pointer) => {
  const allPoints = readVertexes(dxfLines, pointer);

  const firstPt = allPoints.length ? allPoints[0] : null;
  const elevationPoint = !!firstPt
    ? readLineElevation(dxfLines, pointer)(firstPt.x, firstPt.y)
    : [];

  return [...allPoints, ...elevationPoint];
};
