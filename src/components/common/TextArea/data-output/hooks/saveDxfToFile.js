import { dxfPointTypes } from "../../../../../store/thunks/textarea-thunks/readDxfHelpers/dxfCreatePointMap";

export const saveDxfToFile = (transformedData, dxfData) => {
  // Map transformed data to dxfData Points Map
  let i = 0;
  const transformationSteps = dxfData.entityPointsMap.flatMap((dxfPt) => {
    // console.log(transformedData[i]);
    switch (dxfPt.type) {
      case dxfPointTypes.dxf2D:
        return [
          {
            line: dxfPt.lineIndex,
            value: transformedData[i][2],
          },
          {
            line: dxfPt.lineIndex + 2,
            value: transformedData[i++][1],
          },
        ];

      case dxfPointTypes.dxf3D:
        // console.log(transformedData[i]);
        return [
          {
            line: dxfPt.lineIndex,
            value: transformedData[i][2],
          },
          {
            line: dxfPt.lineIndex + 2,
            value: transformedData[i][1],
          },
          {
            line: dxfPt.lineIndex + 4,
            value: transformedData[i++][3],
          },
        ];

      case dxfPointTypes.dxfH:
        return [
          {
            line: dxfPt.lineIndex,
            value: transformedData[i++][3],
          },
        ];

      case dxfPointTypes.dxfDist:
        const dist = Math.sqrt(
          (transformedData[i + 1][1] - transformedData[i][1]) ** 2 +
            (transformedData[i + 1][2] - transformedData[i][2]) ** 2
        );
        i++;
        i++;
        return [
          {
            line: dxfPt.lineIndex,
            value: dist,
          },
        ];

      case dxfPointTypes.dxfRel:
        const relX = transformedData[i + 1][1] - transformedData[i][1];
        const relY = transformedData[i + 1][2] - transformedData[i][2];
        i++;
        i++;
        return [
          {
            line: dxfPt.lineIndex,
            value: relX,
          },
          {
            line: dxfPt.lineIndex + 2,
            value: relY,
          },
        ];

      default:
        return dxfPt;
    }
  });

  const trDxfFileArr = [...dxfData.dxfFileArr];
  transformationSteps.forEach((step) => {
    trDxfFileArr[step.line] = step.value;
  });

  const data = trDxfFileArr.join("\n");
  
  return data;
};
