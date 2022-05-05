import { useEffect, useReducer, useRef, useState } from "react";
import { cmds } from "../command-parser/common/command-names";
import { clearCanvas } from "./drawing-objects/clear-canvas";
import { drawLineSegment } from "./drawing-objects/line-segment";
import { drawPoint } from "./drawing-objects/p-point";
import styles from "./KrokiCanvas.module.css";
import { zoomExtends } from "./utils/bounding-box";
import { scaleCPoint, translatePt, wcsToCanvasCS } from "./utils/transform-pts";

const KrokiCanvas = ({ points, lines, pointActions, lineSegmentActions }) => {
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
  const [cTranslationBasePoint, dispatchTranslationBasePoint] = useReducer(
    basePointReducer,
    {
      panning: false,
      base: [0, 0],
      current: [0, 0],
    }
  );
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
      const pointData = points.map((data) => ({
        id: data.id,
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

      // ctx.beginPath();
      // ctx.moveTo(120, 100);
      // ctx.arc(100, 100, 20, 0, 2 * Math.PI, true);
      // ctx.stroke();

      ctx.beginPath();

      // TODO: The following part needs to be refactored
      const dActions = pointActions.filter(
        (a) => a.type === "DELETE_SINGLE_POINT"
      );
      const uActions = pointActions.filter(
        (a) => a.type === "UPDATE_SINGLE_POINT"
      );
      const drawPtWithCtx = (pt) => {
        let style = "none";
        if (dActions?.find((a) => a.data === pt.id)) {
          style = "delete";
        } else if (uActions?.find((a) => a.data.id === pt.id)) {
          style = "update";
        }
        drawPoint(ctx, style)(pt);
      };

      let cPoints_ = cPoints;

      if (cTranslationBasePoint.panning) {
        const tr = translatePt(cTranslationBasePoint.current);
        cPoints_ = cPoints.map(tr);
      }

      cPoints_.forEach(drawPtWithCtx);

      // Draw line segments
      const allLines = [
        ...lines.flatMap((line) => line.segmentCommands),
        ...lineSegmentActions,
      ];
      const segments = allLines.map((s) => {
        let pts = [];

        switch (s.type) {
          case cmds.LINEAR_SEGMENT:
            pts = [s.data.pt1, s.data.pt2];
            break;
          default:
            pts = [0, 0];
        }

        const trPt1 = cPoints_.find((p) => p.id === pts[0]);
        const trPt2 = cPoints_.find((p) => p.id === pts[1]);

        return [trPt1, trPt2];
      });

      segments.forEach((s) => drawLineSegment(ctx, "insert")(s[0], s[1]));

      ctx.stroke();
    }
  }, [cPoints, canvasRef, w, h, cTranslationBasePoint, pointActions]);

  // If cScale changes recalculate cPoints
  const scrollHandler = (event) => {
    const SCALE_K = 0.3;

    const scale_ = 1 - Math.sign(event.deltaY) * SCALE_K;
    const trans = [event.nativeEvent.offsetX, event.nativeEvent.offsetY];

    const tr = scaleCPoint(scale_, trans);
    const cPoints_ = cPoints.map(tr);
    setCPoints(cPoints_);
  };

  // Handle Pan
  const startMiddleClick = (event) => {
    if (event.button === 1) {
      dispatchTranslationBasePoint({
        type: "turn-on",
        payload: [event.nativeEvent.offsetX, event.nativeEvent.offsetY],
      });
    }
  };

  const panView = (event) => {
    if (cTranslationBasePoint.panning) {
      const clientX = event.nativeEvent.offsetX;
      const clientY = event.nativeEvent.offsetY;
      dispatchTranslationBasePoint({
        type: "update-current",
        payload: [clientX, clientY],
      });
    }
  };

  const endMiddleClick = (event) => {
    if (event.button === 1) {
      // Transform cPoints to final Pan position
      const tr = translatePt(cTranslationBasePoint.current);
      const cPoints_ = cPoints.map(tr);
      setCPoints(cPoints_);

      // Reset Pan base point
      dispatchTranslationBasePoint({
        type: "turn-off",
      });

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

function basePointReducer(state, action) {
  switch (action.type) {
    case "turn-on":
      return {
        panning: true,
        base: action.payload,
        current: [0, 0],
      };
    case "turn-off":
      return {
        panning: false,
        base: [0, 0],
        current: [0, 0],
      };
    case "update-current":
      const [clientX, clientY] = action.payload;
      return {
        ...state,
        current: [state.base[0] - clientX, state.base[1] - clientY],
      };
    default:
      throw new Error();
  }
}
