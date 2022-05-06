import { goToEntities } from "./dxfParsers/dxfGoToEntities";
import { readGroup } from "./dxfParsers/dxfReadGroup";

const readDxfThunk = (dxfStr) => (dispatch, getState) => {
  const dxfLines = dxfStr.split(/\n|\r|\n\r|\r\n/);
  const initPointer = 0;
  
  const [dxfEntLines, entPointer] = goToEntities(dxfLines, initPointer);
  console.log("trest")
  console.log(entPointer)
};

export default readDxfThunk;
