import { read3DVertices } from "../common-parsers/dxfReadAll3DVertices";

export const read3DFace = (dxfLines, pointer) => {
  const pt1 = read3DVertices(dxfLines, pointer, 10);

  // const firstPt = allPoints.length ? allPoints[0] : null;
  // const elevationPoint = !!firstPt
  //   ? readLineElevation(dxfLines, pointer)(firstPt.x, firstPt.y)
  //   : [];

  return [...pt1];
};
