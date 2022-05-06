import { createDxfReader } from "./dxfCreateReader";

// Group object
const createGroup = (dxfReader, group) => ({
  dxfReader,
  group,
});

// Read group
// Group consists of two lines
export const readGroup = (dxfReader) => {
  if (pointer >= lines.length - 2) {
    return createGroup(dxfReader, null);
  }
  const { dxf, pointer } = dxfReader;
  const nextCode = dxf[pointer + 1];
  const nextValue = dxf[pointer + 2];
  const nextDxfReader = createDxfReader(dxf, pointer + 2);

  return createGroup(nextDxfReader, [nextCode, nextValue]);
};
