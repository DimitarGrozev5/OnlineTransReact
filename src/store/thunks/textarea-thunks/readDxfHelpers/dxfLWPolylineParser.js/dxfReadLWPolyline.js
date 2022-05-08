import { readLineElevation } from "./dxfReadLineElevation";
import { read2DVertices } from "../common-parsers/dxfReadAll2DVertices";

export const readLWPolyline = (dxfLines, pointer) => {
  const allPoints = read2DVertices(dxfLines, pointer);

  const firstPt = allPoints.length ? allPoints[0] : null;
  const elevationPoint = !!firstPt
    ? readLineElevation(dxfLines, pointer)(firstPt.x, firstPt.y)
    : [];

  return [...allPoints, ...elevationPoint];
};
