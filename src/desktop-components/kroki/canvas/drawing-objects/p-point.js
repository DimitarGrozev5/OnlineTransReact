export const drawPoint = (ctx) => (pt) => {
  ctx.save();

  // Draw point
  ctx.moveTo(pt.x + 2, pt.y);
  ctx.arc(pt.x, pt.y, 2, 0, 2 * Math.PI, true);

  // Draw label
  ctx.font = "12px sans-serif";
  ctx.fillText(pt.n, pt.x + 5, pt.y);
  ctx.fillText(pt.h.toFixed(3), pt.x + 5, pt.y + 14);

  ctx.restore();
};
