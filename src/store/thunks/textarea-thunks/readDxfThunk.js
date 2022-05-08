import { readGroup } from "./readDxfHelpers/dxfReadGroup";
import { getEntities } from "./readDxfHelpers/dxfGetEntities";
import { inputDataActions } from "../../input-data";

const revertGroup = (pointer) => {
  if (pointer < 0) {
    return -2;
  }
  return pointer - 2;
};

// point map:
// {
//   xLineIndex,
//   x,
//   y,
//   h,(optional)
// }
// OR
// {
//   zLineIndex,
//   x,
//   y,
//   h,
// }
const newPointMap = (xLineIndex, x, y, h = null, onlyH = false) => {
  if (h === null) {
    return { xLineIndex, x, y };
  } else {
    if (onlyH) {
      return { zLineIndex: xLineIndex, x, y, h };
    }
    return { xLineIndex, x, y, h };
  }
};
const readVertexes = (dxfLines, pointer) => {
  const readGroup_ = readGroup(dxfLines);
  const allPoints = [];

  let [code, value, nextPointer] = readGroup_(pointer);
  console.log(value);
  if (code === "10") {
    const xLineIndex = nextPointer;
    const y = +value;
    [code, value, nextPointer] = readGroup_(nextPointer);
    const x = +value;

    const ptMap = newPointMap(xLineIndex, x, y);
    allPoints.push(ptMap);
  }

  while (code !== "0" && nextPointer) {
    [code, value, nextPointer] = readGroup_(nextPointer);
    if (code === "10") {
      const xLineIndex = nextPointer + 1;
      const y = +value;
      [code, value, nextPointer] = readGroup_(nextPointer);
      const x = +value;

      const ptMap = newPointMap(xLineIndex, x, y);
      allPoints.push(ptMap);
    }
  }
  return allPoints;
};

const readLineElevation = (dxfLines, pointer) => (x, y) => {
  const readGroup_ = readGroup(dxfLines);
  let [code, value, nextPointer] = readGroup_(pointer);
  if (code === "38") {
    const ptMap = newPointMap(nextPointer + 1, +x, +y, value, true);
    return [ptMap];
  }
  while (code !== 0 && nextPointer) {
    [code, value, nextPointer] = readGroup_(nextPointer);
    if (code === "38") {
      const ptMap = newPointMap(nextPointer + 1, +x, +y, value, true);
      return [ptMap];
    }
  }
  return [];
};

const readLWPolyline = (dxfLines, pointer) => {
  const allPoints = readVertexes(dxfLines, pointer);

  const firstPt = allPoints.length ? allPoints[0] : null;
  const elevationPoint = !!firstPt
    ? readLineElevation(dxfLines, pointer)(firstPt.x, firstPt.y)
    : [];

  return [...allPoints, ...elevationPoint];
};

const readDxfThunk = (dxfStr) => (dispatch, getState) => {
  const dxfLines = dxfStr.split(/\n\r|\r\n|\n|\r/).map((s) => s.trim());

  const pointersToEntities = getEntities(dxfLines);

  const supportedEntitiesParsers = {
    LWPOLYLINE: readLWPolyline,
  };

  const reducer = (pointsMap, entityPointer) => {
    const pointer = revertGroup(entityPointer);
    const [code, entityName, nextPointer] = readGroup(dxfLines)(pointer);

    if (!(entityName in supportedEntitiesParsers)) {
      return pointsMap;
    }

    const newPointsMap = supportedEntitiesParsers[entityName](
      dxfLines,
      nextPointer
    );

    return [...pointsMap, ...newPointsMap];
  };

  const entityPointsMap = pointersToEntities.reduce(reducer, []);

  const dxfDataUpdate = {
    dxfFileArr: dxfLines,
    entityPointsMap,
  };
  dispatch(inputDataActions.updateDxfData(dxfDataUpdate));
};

export default readDxfThunk;
