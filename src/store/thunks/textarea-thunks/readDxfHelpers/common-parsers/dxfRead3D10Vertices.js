import { read3DVertices } from "../common-parsers/dxfReadAll3DVertices";

export const read3D10Vertices = (dxfLines, pointer) => {
  const pts = read3DVertices(dxfLines, pointer, 10);

  return [...pts];
};
