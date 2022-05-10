import { read3DVertices } from "../common-parsers/dxfReadAll3DVertices";

export const readMText = (dxfLines, pointer) => {
  const basePoint = read3DVertices(dxfLines, pointer, 10);

  return [...basePoint];
};
