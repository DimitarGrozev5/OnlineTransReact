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
export const newPointMap = (
  xLineIndex,
  x,
  y,
  h = null,
  onlyH = false,
  scale = false
) => {
  if (h === null) {
    return { xLineIndex, x, y };
  } else {
    if (onlyH) {
      return { zLineIndex: xLineIndex, x, y, h };
    }
    return { xLineIndex, x, y, h };
  }
};

// Point index generator
const mapPointId = function* () {
  let i = 0;
  while (true) {
    yield i++;
  }
};
export const mapPtId = mapPointId();

// Point types
export const dxfPointTypes = {
  dxf2D: "2D point",
  dxf3D: "3D point",
  dxfH: "H point",
  dxfDist: "Distance value",
  dxfRel: "Relative point",
};

// Standart 2D point
export const new2DPointMap = (lineIndex, x, y) => ({
  type: dxfPointTypes.dxf2D,
  lineIndex,
  id: mapPtId.next().value,
  x,
  y,
});

// Standart 3D point
export const new3DPointMap = (lineIndex, x, y, h) => ({
  type: dxfPointTypes.dxf3D,
  lineIndex,
  id: mapPtId.next().value,
  x,
  y,
  h,
});

// Point that caries only H information
// x and y are stored because the height transfoirmation requires them
export const newHPointMap = (lineIndex, x, y, h) => ({
  type: dxfPointTypes.dxfH,
  lineIndex,
  id: mapPtId.next().value,
  x,
  y,
  h,
});

// Distance value
// Two points are stored
// One is supplied and the other is calculated base on the distance
export const newDistanceMap = (lineIndex, x, y, dist) => ({
  type: dxfPointTypes.dxfDist,
  lineIndex,
  id1: mapPtId.next().value,
  x1: x,
  y1: y,
  id2: mapPtId.next().value,
  x2: x + dist,
  y2: y,
});

// Realative point
// Two points are stored
// One is a base point, the other is relative to the first
export const newRelativePointMap = (lineIndex, x, y, dx, dy) => ({
  type: dxfPointTypes.dxfRel,
  lineIndex,
  id1: mapPtId.next().value,
  x1: x,
  y1: y,
  id2: mapPtId.next().value,
  x2: x + dx,
  y2: y + dy,
});
