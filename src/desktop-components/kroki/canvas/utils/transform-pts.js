import { pipe } from "../../../../utils/pipe";

// Translate and reverse translate points
const wcsTranslate = (translation) => (pt) => ({
  ...pt,
  x: pt.x - translation[0],
  y: pt.y - translation[1],
});

const wcsTranslateR = (translation) => (pt) => ({
  ...pt,
  x: pt.x + translation[0],
  y: pt.y + translation[1],
});

// Scale and reverse scale points
const wcsScale = (scale) => (pt) => ({
  ...pt,
  x: pt.x * scale,
  y: pt.y * scale,
});

const wcsScaleR = (scale) => (pt) => ({
  ...pt,
  x: pt.x / scale,
  y: pt.y / scale,
});

// Convert decart local CS to Canvas CS
const lToC = (h, w) => (pt) => ({
  ...pt,
  // x: (3 * h) / 2 - pt.x,
  y: -1 * (pt.x - h / 2),
  x: pt.y + w / 2,
});

const cToL = (h, w) => (pt) => ({
  ...pt,
  // x: (3 * h) / 2 - pt.x,
  y: -1 * (pt.x + h / 2),
  x: pt.y - w / 2,
});

// Convert WCS to Canvas
export const wcsToCanvasCS = (scale, translation, h, w) => (pt) =>
  pipe(pt)(wcsTranslate(translation), wcsScale(scale), lToC(h, w));
