import { useEffect, useRef, useState } from "react";
import { clearCanvas } from "./drawing-objects/clear-canvas";
import { drawPoint } from "./drawing-objects/p-point";
import styles from "./KrokiCanvas.module.css";
import { zoomExtends } from "./utils/bounding-box";
import { scaleCPoint, translatePt, wcsToCanvasCS } from "./utils/transform-pts";

const KrokiCanvas = ({ points }) => {
  const containerRef = useRef();
  const canvasRef = useRef();

  // Canvas width and height
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);

  // Scale and translation for transforming WCS coordinates in to Canvas coordinates
  const [gScale, setGScale] = useState(0);
  const [gTranslation, setGTranslation] = useState([0, 0]);

  // Array for points with Canvas coordinates
  const [cPoints, setCPoints] = useState([]);

  // Translation for Pan command [currently Paning, translationX, translationY]
  const [cTranslationBasePoint, setCTranslationBasePoint] = useState([
    false,
    0,
    0,
  ]);
  // Timestamp of the last time the middle button was lifted
  // Used for determening a double middle click, which is used
  // for zooming to extents
  const [lastMiddleUp, setLastMiddleUp] = useState(0);

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
      // Clear canvas
      clearCanvas(ctx, h, w);

      ctx.beginPath();

      const drawPtWithCtx = drawPoint(ctx);

      cPoints.forEach(drawPtWithCtx);

      ctx.stroke();
    }
  }, [cPoints, canvasRef, w, h]);

  // If cScale changes recalculate cPoints
  const scrollHandler = (event) => {
    const SCALE_K = 0.2;

    const scale_ = 1 + Math.sign(event.deltaY) * SCALE_K;
    const trans = [event.nativeEvent.offsetX, event.nativeEvent.offsetY];

    const tr = scaleCPoint(scale_, trans);
    const cPoints_ = cPoints.map(tr);
    setCPoints(cPoints_);
  };

  // Handle Pan
  const startMiddleClick = (event) => {
    if (event.button === 1) {
      setCTranslationBasePoint([
        true,
        event.nativeEvent.offsetX,
        event.nativeEvent.offsetY,
      ]);
    }
  };

  const panView = (event) => {
    if (cTranslationBasePoint[0]) {
      const [, baseX, baseY] = cTranslationBasePoint;
      const clentX = event.nativeEvent.offsetX;
      const clentY = event.nativeEvent.offsetY;
      const trans = [clentX - baseX, clentY - baseY];
      setCTranslationBasePoint([true, ...trans]);

      const tr = translatePt(trans);
      const cPoints_ = cPoints.map(tr);
      setCPoints(cPoints_);
    }
  };

  const endMiddleClick = (event) => {
    if (event.button === 1) {
      setCTranslationBasePoint([false, 0, 0]);

      // Handle middle click
      const now = Date.now();
      if (now - lastMiddleUp < 500) {
        setGScale(0);
        setGTranslation([0, 0]);
      }
      setLastMiddleUp(now);
    }
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        onWheel={scrollHandler}
        onMouseDown={startMiddleClick}
        onMouseMove={panView}
        onMouseUp={endMiddleClick}
      ></canvas>
    </div>
  );
};

export default KrokiCanvas;
