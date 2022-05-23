import { read2DVertices } from "./common-parsers/dxfReadAll2DVertices";
import { readGroup } from "./dxfReadGroup";

export const readExtents = (dxfLines) => {
  const readGroup_ = readGroup(dxfLines);

  // Find extents pointers
  const extentsPointers = [];

  let [code, value, nextPointer] = readGroup_(0);
  if (code === "9") {
    if (value === "$EXTMIN" || value === "$EXTMAX") {
      extentsPointers.push(nextPointer);
    }
  }
  while (value !== "EOF" && nextPointer && extentsPointers.length < 2) {
    [code, value, nextPointer] = readGroup_(nextPointer);
    if (code === "9") {
      if (value === "$EXTMIN" || value === "$EXTMAX") {
        extentsPointers.push(nextPointer);
      }
    }
  }
  if (extentsPointers.length < 2) {
    return [];
  }

  const pt1 = read2DVertices(dxfLines, extentsPointers[0], 10);
  const pt2 = read2DVertices(dxfLines, extentsPointers[1], 10);

  return [...pt1, ...pt2];
};
