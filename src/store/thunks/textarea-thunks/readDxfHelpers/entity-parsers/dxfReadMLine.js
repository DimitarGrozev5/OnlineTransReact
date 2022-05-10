import { read3DVertices } from "../common-parsers/dxfReadAll3DVertices";

export const readMLine = (dxfLines, pointer) => {
  const startPoint = read3DVertices(dxfLines, pointer, 10);
  const vertices = read3DVertices(dxfLines, pointer, 11);

  return [...startPoint, ...vertices];
};
