import { readGroup } from "./dxfReadGroup";

const notCodeValue = (code, value) => (dxfReader) => {
  const nextGroup = readGroup(dxfReader);

  if (!nextGroup.group) {
    return null;
  }

  if (nextGroup.group[0] !== code || nextGroup.group[1] !== value) {
    return {
      dxfReader: nextGroup.dxfReader,
      result: true,
    };
  } else {
    return {
      dxfReader: nextGroup.dxfReader,
      result: false,
    };
  }
};

export const notSection = notCodeValue(0, "SECTION");
export const notEntities = notCodeValue(0, "ENTITIES");
