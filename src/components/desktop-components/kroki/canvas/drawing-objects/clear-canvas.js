import { BACKGROUND_COLOR } from "./defaults";

export const clearCanvas = (ctx, h, w) => {
  ctx.save();
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
};
