const min = (arg) => (a, b) => a < b[arg] ? a : b[arg];
const max = (arg) => (a, b) => a > b[arg] ? a : b[arg];

// const minMax = (arg) => (a, b) => [min(arg)(a[0], b), max(arg)(a[1], b)];
// const minMaxXY = (a, b) => [minMax("x")(a[0], b), minMax("y")(a[1], b)];

const selectPoint = (fn) => (a, b) => [fn("x")(a[0], b), fn("y")(a[1], b)];
const minMin = selectPoint(min);
const maxMax = selectPoint(max);
const minMaxXY = (a, b) => [minMin(a[0], b), maxMax(a[1], b)];

const initialValue = [
  [10000000, 10000000],
  [0, 0],
];

// {n, x, y, h, c} => [[minX, minY], [maxX, maxY]]
const boundingRect = (pointData) =>
  pointData.reduce(minMaxXY, initialValue);

export const zoomExtends = (pointData, h, w) => {
  const [[minX, minY], [maxX, maxY]] = boundingRect(pointData);

  // Calculate WCS boundry size
  const wcsW = maxY - minY;
  const wcsH = maxX - minX;

  // Calculate scaling factor
  const sX = h / wcsH;
  const sY = w / wcsW;
  const scale = Math.min(sX, sY);

  // Calculate Translаtion
  const trans = [(maxX + minX) / 2, (maxY + minY) / 2];

  return [scale, trans];
};
