import { read3DVertices } from "../common-parsers/dxfReadAll3DVertices";
import { readDistance } from "../common-parsers/dxfReadDistance";

export const readArc = (dxfLines, pointer) => {
  const center = read3DVertices(dxfLines, pointer, 10);

  const dist = readDistance(dxfLines, pointer, center[0].x, center[0].y, 40);

  return [...center, ...dist];
};
