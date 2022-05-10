import { read3DVertices } from "../common-parsers/dxfReadAll3DVertices";

export const readDimension = (dxfLines, pointer) => {
  const baseCodes = [10, 11, 12, 13, 14, 15, 16, 17, 19];

  const pts = baseCodes.reduce((p, code) => {
    const cp = read3DVertices(dxfLines, pointer, code);
    return [...p, ...cp];
  }, []);

  return [...pts];
};
