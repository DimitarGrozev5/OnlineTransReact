import { read3DVertices } from "../common-parsers/dxfReadAll3DVertices";

export const readLine = (dxfLines, pointer) => {
  const pt1 = read3DVertices(dxfLines, pointer, 10);
  const pt2 = read3DVertices(dxfLines, pointer, 11);

  return [...pt1, ...pt2];
};
