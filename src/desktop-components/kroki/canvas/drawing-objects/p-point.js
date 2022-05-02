export const drawPoint =
  (ctx, style = "none") =>
  (pt) => {
    ctx.save();

    if (style === "delete") {
      ctx.fillStyle = "red";
    } else if (style === "update") {
      ctx.fillStyle = "rgb(204, 204, 19)";
    }

    // Draw point
    ctx.moveTo(pt.x + 2, pt.y);
    ctx.arc(pt.x, pt.y, 2, 0, 2 * Math.PI, true);

    // Draw label
    ctx.font = "12px sans-serif";
    ctx.fillText(pt.n, pt.x + 5, pt.y);
    ctx.fillText(pt.h.toFixed(3), pt.x + 5, pt.y + 14);
    ctx.fillText(pt.c, pt.x + 5, pt.y + 28);

    ctx.restore();
  };
