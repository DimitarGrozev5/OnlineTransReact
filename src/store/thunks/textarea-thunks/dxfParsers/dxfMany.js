import { readGroup } from "./dxfReadGroup";

const testParser = (parser) => (dxfReader) => {
  const nextGroup = readGroup(dxfReader);
  if (!nextGroup.group) {
    return dxfReader;
  }
  
};

export const many = (parser) => (dxfReader) => {};
