import { readVertexes } from "./dxfReadVertexes";
import { readLineElevation } from "./dxfReadLineElevation";
import { read2DVertecies } from "../common-parsers/dxfReadAll2DVertecies";

export const readLWPolyline = (dxfLines, pointer) => {
  // const allPoints = readVertexes(dxfLines, pointer);
  const allPoints = read2DVertecies(dxfLines, pointer);

  const firstPt = allPoints.length ? allPoints[0] : null;
  const elevationPoint = !!firstPt
    ? readLineElevation(dxfLines, pointer)(firstPt.x, firstPt.y)
    : [];

  return [...allPoints, ...elevationPoint];
};
