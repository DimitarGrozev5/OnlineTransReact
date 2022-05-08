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
export const newPointMap = (xLineIndex, x, y, h = null, onlyH = false) => {
  if (h === null) {
    return { xLineIndex, x, y };
  } else {
    if (onlyH) {
      return { zLineIndex: xLineIndex, x, y, h };
    }
    return { xLineIndex, x, y, h };
  }
};