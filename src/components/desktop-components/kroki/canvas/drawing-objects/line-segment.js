export const drawLineSegment =
  (ctx, style = "none") =>
  (pt1, pt2) => {
    ctx.save();

    if (style === "delete") {
      ctx.fillStyle = "red";
    } else if (style === "update") {
      ctx.fillStyle = "rgb(204, 204, 19)";
    } else if (style === "insert") {
      ctx.fillStyle = "green";
    }

    // Draw line
    ctx.moveTo(pt1.x, pt1.y);
    ctx.lineTo(pt2.x, pt2.y);

    ctx.restore();
  };
