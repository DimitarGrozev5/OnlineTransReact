import { read3DVertices } from "../common-parsers/dxfReadAll3DVertices";

export const read3DFace = (dxfLines, pointer) => {
  const getAll3DPoints = (dxfLines, pointer, pts, i) => {
    const pt = read3DVertices(dxfLines, pointer, i);
    if (pt.length) {
      return getAll3DPoints(dxfLines, pointer, [...pts, ...pt], i + 1);
    } else {
      return [...pts];
    }
  };
  // const pt1 = read3DVertices(dxfLines, pointer, 10);
  // const pt2 = read3DVertices(dxfLines, pointer, 11);
  // const pt3 = read3DVertices(dxfLines, pointer, 12);

  const pts = getAll3DPoints(dxfLines, pointer, [], 10);

  return [...pts];
  // return [...pt1, ...pt2, ...pt3];
};
