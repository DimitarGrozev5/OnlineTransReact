import { readGroup } from "./readDxfHelpers/dxfReadGroup";
import { revertGroup } from "./readDxfHelpers/dxfRevertGroup";
import { getEntities } from "./readDxfHelpers/dxfGetEntities";
import { inputDataActions } from "../../input-data";
import { readLWPolyline } from "./readDxfHelpers/dxfLWPolylineParser.js/dxfReadLWPolyline";
import { read3DFace } from "./readDxfHelpers/entity-parsers/dxfRead3DFace";
import { readArc } from "./readDxfHelpers/entity-parsers/dxfReadArc";
import { readCircle } from "./readDxfHelpers/entity-parsers/dxfReadCircle";

const readDxfThunk = (dxfStr) => (dispatch, getState) => {
  const dxfLines = dxfStr.split(/\n\r|\r\n|\n|\r/).map((s) => s.trim());

  const pointersToEntities = getEntities(dxfLines);

  const supportedEntitiesParsers = {
    LWPOLYLINE: readLWPolyline,
    "3DFACE": read3DFace,
    ARC: readArc,
    CIRCLE: readCircle,
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
