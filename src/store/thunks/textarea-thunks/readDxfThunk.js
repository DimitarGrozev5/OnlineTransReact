import { readGroup } from "./readDxfHelpers/dxfReadGroup";
import { getEntities } from "./readDxfHelpers/dxfGetEntities";

const revertGroup = (pointer) => {
  if (pointer < 0) {
    return -2;
  }
  return pointer - 2;
};

const readDxfThunk = (dxfStr) => (dispatch, getState) => {
  const dxfLines = dxfStr.split(/\n\r|\r\n|\n|\r/).map((s) => s.trim());

  const pointersToEntities = getEntities(dxfLines);
  console.log(pointersToEntities);
};

export default readDxfThunk;
