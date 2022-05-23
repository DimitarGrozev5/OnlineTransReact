import { pipe } from "../../../../../utils/pipe";

// Translate and reverse translate points
export const translatePt = (translation) => (pt) => ({
  ...pt,
  x: pt.x - translation[0],
  y: pt.y - translation[1],
});

const translatePtR = (translation) => (pt) => ({
  ...pt,
  x: pt.x + translation[0],
  y: pt.y + translation[1],
});

// Scale and reverse scale points
const scalePt = (scale) => (pt) => ({
  ...pt,
  x: pt.x * scale,
  y: pt.y * scale,
});

// const scalePtR = (scale) => (pt) => ({
//   ...pt,
//   x: pt.x / scale,
//   y: pt.y / scale,
// });

// Convert decart local CS to Canvas CS
const lToC = (h, w) => (pt) => ({
  ...pt,
  // x: (3 * h) / 2 - pt.x,
  y: -1 * (pt.x - h / 2),
  x: pt.y + w / 2,
});

// const cToL = (h, w) => (pt) => ({
//   ...pt,
//   // x: (3 * h) / 2 - pt.x,
//   y: -1 * (pt.x + h / 2),
//   x: pt.y - w / 2,
// });

// Convert WCS to Canvas
export const wcsToCanvasCS = (scale, translation, h, w) => (pt) =>
  pipe(pt)(translatePt(translation), scalePt(scale), lToC(h, w));

export const scaleCPoint = (scale, translation) => (pt) =>
  pipe(pt)(translatePt(translation), scalePt(scale), translatePtR(translation));

export const panCPoint = (baseTrans, prevTrans, currentTrans) => (pt) =>
  pipe(pt)(
    translatePt(baseTrans),
    translatePt(prevTrans),
    translatePtR(currentTrans),
    translatePtR(baseTrans)
  );
