import { readGroup } from "./readDxfHelpers/dxfReadGroup";
import { revertGroup } from "./readDxfHelpers/dxfRevertGroup";
import { getEntities } from "./readDxfHelpers/dxfGetEntities";
import { inputDataActions } from "../../input-data";
import { readLWPolyline } from "./readDxfHelpers/dxfLWPolylineParser.js/dxfReadLWPolyline";
import { read3DFace } from "./readDxfHelpers/entity-parsers/dxfRead3DFace";
import { readArc } from "./readDxfHelpers/entity-parsers/dxfReadArc";
import { readCircle } from "./readDxfHelpers/entity-parsers/dxfReadCircle";
// import { readDimension } from "./readDxfHelpers/entity-parsers/dxfReadDimension";
import { readEllipse } from "./readDxfHelpers/entity-parsers/dxfReadEllipse";
import { readInsertBlock } from "./readDxfHelpers/entity-parsers/dxfReadInsertBlock";
import { readLeader } from "./readDxfHelpers/entity-parsers/dxfReadLeader";
import { readLine } from "./readDxfHelpers/entity-parsers/dxfReadLine";
import { readMLine } from "./readDxfHelpers/entity-parsers/dxfReadMLine";
import { read3D10Vertices } from "./readDxfHelpers/common-parsers/dxfRead3D10Vertices";
import { dxfPointTypes } from "./readDxfHelpers/dxfCreatePointMap";
import { readPolyline } from "./readDxfHelpers/entity-parsers/dxfReadPolyline";
import { readSpline } from "./readDxfHelpers/entity-parsers/dxfReadSpline";

const readDxfThunk = (dxfStr) => (dispatch, getState) => {
  const dxfLines = dxfStr.split(/\n\r|\r\n|\n|\r/).map((s) => s.trim());
  // console.timeLog();
  // console.log("dxf broken in lines");

  const pointersToEntities = getEntities(dxfLines);

  const supportedEntitiesParsers = {
    "3DFACE": read3DFace,
    ARC: readArc,
    CIRCLE: readCircle,
    // DIMENSION: readDimension,
    // ARC_DIMENSION: readDimension,
    // LARGE_RADIAL_DIMENSION: readDimension,
    ELLIPSE: readEllipse,
    INSERT: readInsertBlock,
    LEADER: readLeader,
    LINE: readLine,
    LWPOLYLINE: readLWPolyline,
    MLINE: readMLine,
    MTEXT: read3D10Vertices,
    POINT: read3D10Vertices,
    SHAPE: read3D10Vertices,
    SOLID: read3DFace,
    SPLINE: readSpline,
    ACAD_TABLE: read3D10Vertices,
    TEXT: read3D10Vertices,
    VERTEX: read3D10Vertices,
  };

  // Define reducer and get map points from dxf lines
  const reducer = (pointsMap, entityPointer) => {
    const pointer = revertGroup(entityPointer);
    const [, entityName, nextPointer] = readGroup(dxfLines)(pointer);

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

  // The POLYLINE entity has only an elevation point of x: 0, y: 0, h:[some value]
  // Get one of the entityPointsMap points, to pass along it's coordinates
  const [rndX, rndY] = getRandomXYFromPointMap(entityPointsMap);

  const plineParser = {
    POLYLINE: readPolyline(rndX, rndY),
  };
  const plineReducer = (pointsMap, entityPointer) => {
    const pointer = revertGroup(entityPointer);
    const [, entityName, nextPointer] = readGroup(dxfLines)(pointer);

    if (!(entityName in plineParser)) {
      return pointsMap;
    }

    const newPointsMap = plineParser[entityName](dxfLines, nextPointer);

    return [...pointsMap, ...newPointsMap];
  };

  const allEntityPointsMap = pointersToEntities.reduce(plineReducer, [
    ...entityPointsMap,
  ]);

  // Setup dispatch payload
  const dxfDataUpdate = {
    dxfFileArr: dxfLines,
    entityPointsMap: allEntityPointsMap,
  };

  dispatch(inputDataActions.updateDxfData(dxfDataUpdate));
};

export default readDxfThunk;

// Helper function to extract the first coordiante point from the parsed objects
function getRandomXYFromPointMap(entityPointsMap) {
  const normalPtTypes = [
    dxfPointTypes.dxf2D,
    dxfPointTypes.dxf3D,
    dxfPointTypes.dxfH,
  ];
  let rndPoint = entityPointsMap.find((pt) => normalPtTypes.includes(pt.type));
  let rndX = rndPoint?.x;
  let rndY = rndPoint?.y;

  if (!rndPoint) {
    const doublePtTypes = [dxfPointTypes.dxfDist, dxfPointTypes.dxfRel];
    rndPoint = entityPointsMap.find((pt) => doublePtTypes.includes(pt.type));
    rndX = rndPoint?.x1;
    rndY = rndPoint?.y1;
  }

  return [rndX, rndY];
}
