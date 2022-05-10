import { read3DVertices } from "../common-parsers/dxfReadAll3DVertices";

export const readInsertBlock = (dxfLines, pointer) => {
  const center = read3DVertices(dxfLines, pointer, 10);

  return [...center];
};
