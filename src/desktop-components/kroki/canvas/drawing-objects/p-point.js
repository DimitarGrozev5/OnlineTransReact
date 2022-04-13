export const drawPoint = (ctx) => (pt) => {
  ctx.moveTo(pt.x, pt.y);
  // ctx.lineTo(pt.x + 5, pt.y + 5);
  ctx.arc(pt.x, pt.y, 2, 0, 2 * Math.PI, true);
};
