import { read3DVertices } from "../common-parsers/dxfReadAll3DVertices";

export const readSpline = (dxfLines, pointer) => {
  const controlPts = read3DVertices(dxfLines, pointer, 10);
  const fitPts = read3DVertices(dxfLines, pointer, 11);

  return [...controlPts, ...fitPts];
};
