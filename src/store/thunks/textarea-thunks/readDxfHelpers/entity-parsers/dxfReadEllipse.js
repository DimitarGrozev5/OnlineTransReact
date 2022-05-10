import { read3DVertices } from "../common-parsers/dxfReadAll3DVertices";
import { readRelative2DPoint } from "../common-parsers/dxfReadRelative2DPoint";

export const readEllipse = (dxfLines, pointer) => {
  const center = read3DVertices(dxfLines, pointer, 10);
  const relative = readRelative2DPoint(
    dxfLines,
    pointer,
    center[0].x,
    center[0].y,
    11
  );

  return [...center, ...relative];
};
