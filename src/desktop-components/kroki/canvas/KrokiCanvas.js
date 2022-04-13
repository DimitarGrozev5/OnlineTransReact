import { useEffect, useRef, useState } from "react";
import { drawPoint } from "./drawing-objects/p-point";
import styles from "./KrokiCanvas.module.css";
import { zoomExtends } from "./utils/bounding-box";
import { wcsToCanvasCS } from "./utils/transform-pts";

const KrokiCanvas = ({ points }) => {
  const containerRef = useRef();
  const canvasRef = useRef();

  const [w, setW] = useState(0);
  const [h, setH] = useState(0);

  const [gScale, setGScale] = useState(0);
  const [gTranslation, setGTranslation] = useState([0, 0]);

  const [cPoints, setCPoints] = useState([]);
  const [cTranslationBasePoint, setCTranslationBasePoint] = useState([
    false,
    0,
    0,
  ]);

  // Set canvas size dynamically, based on container size
  useEffect(() => {
    canvasRef.current.width = containerRef.current.clientWidth;
    canvasRef.current.height = containerRef.current.clientHeight;

    setW(containerRef.current.clientWidth);
    setH(containerRef.current.clientHeight);
  }, [canvasRef, containerRef]);

  // If the WCS Data chages, recalculate the C points
  useEffect(() => {
    if (w && h) {
      const pointData = points.map(({ data }) => ({
        n: data.n,
        x: +data.x,
        y: +data.y,
        h: +data.h,
        c: data.c,
      }));

      let scale = gScale;
      let trans = gTranslation;
      // If scale and translation are uninitialized, calculate initial values
      if (gScale === 0 || gTranslation[0] === 0 || gTranslation[1] === 0) {
        [scale, trans] = zoomExtends(pointData, h, w);

        // Set scale and translation
        setGScale(scale);
        setGTranslation(trans);
      }

      // Calculate cPoints
      const tr = wcsToCanvasCS(scale, trans, h, w);
      const cPoints_ = pointData.map(tr);

      // Set cPoints
      setCPoints(cPoints_);
    }
  }, [w, h, points, gScale, gTranslation]);

  // If the cPoints change, redraw them
  useEffect(() => {
    if (cPoints.length) {
      // Draw points
      const ctx = canvasRef.current.getContext("2d");
      ctx.beginPath();

      const drawPtWithCtx = drawPoint(ctx);

      cPoints.forEach(drawPtWithCtx);

      ctx.stroke();
    }
  }, [cPoints, canvasRef]);

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
    </div>
  );
};

export default KrokiCanvas;
