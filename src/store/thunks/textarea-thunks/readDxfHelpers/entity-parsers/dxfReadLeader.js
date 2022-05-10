import { read3DVertices } from "../common-parsers/dxfReadAll3DVertices";

export const readLeader = (dxfLines, pointer) => {
  const vertices = read3DVertices(dxfLines, pointer, 10);

  return [...vertices];
};
