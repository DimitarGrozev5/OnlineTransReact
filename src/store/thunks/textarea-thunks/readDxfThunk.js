import { createDxfReader } from "./dxfParsers/dxfCreateReader";
import { notSection } from "./dxfParsers/dxfNotGroup";

const readDxfThunk = (dxfStr) => (dispatch, getState) => {
  const dxfLines = dxfStr.split(/\n|\r|\n\r|\r\n/);
  const initDxfReader = createDxfReader(dxfLines, 0);

  console.log(notSection(initDxfReader));
};

export default readDxfThunk;
