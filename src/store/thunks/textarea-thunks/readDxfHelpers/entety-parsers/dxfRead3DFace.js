import { read3DVertices } from "../common-parsers/dxfReadAll3DVertices";

export const read3DFace = (dxfLines, pointer) => {
  const pt1 = read3DVertices(dxfLines, pointer, 10);
  const pt2 = read3DVertices(dxfLines, pointer, 11);
  const pt3 = read3DVertices(dxfLines, pointer, 12);

  return [...pt1, ...pt2, ...pt3];
};
