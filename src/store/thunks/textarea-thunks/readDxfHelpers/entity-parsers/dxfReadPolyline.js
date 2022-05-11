import { readHFromPoint } from "../common-parsers/dxfReadHFromPoint";

export const readPolyline = (x, y) => (dxfLines, pointer) => {
  const elevationPoint = readHFromPoint(dxfLines, pointer, x, y, 10);

  return [...elevationPoint];
};
