import { useEffect, useRef, useState } from "react";
import styles from "./KrokiCanvas.module.css";

const KrokiCanvas = ({ points }) => {
  const containerRef = useRef();
  const canvasRef = useRef();

  const [w, setW] = useState(0);
  const [h, setH] = useState(0);

  const [scale, setScale] = useState(0);
  const [translation, setTranslation] = useState([0, 0]);

  // Set canvas size
  useEffect(() => {
    canvasRef.current.width = containerRef.current.clientWidth;
    canvasRef.current.height = containerRef.current.clientHeight;

    setW(containerRef.current.clientWidth);
    setH(containerRef.current.clientHeight);
  }, [canvasRef, containerRef]);

  // On first run claculate initial scale and transaltion
  useEffect(() => {
    if (w && h) {
      /// Get points bounding box
      const pointData = points.map(({ data }) => ({
        n: data.n,
        x: +data.x,
        y: +data.y,
        h: +data.h,
        c: data.c,
      }));

      // TODO: account for empty object?
      const min = (arg) => (a, b) => a < b[arg] ? a : b[arg];
      const max = (arg) => (a, b) => a > b[arg] ? a : b[arg];

      const minMax = (arg) => (a, b) => [min(arg)(a[0], b), max(arg)(a[1], b)];
      const minMaxXY = (a, b) => [minMax("x")(a[0], b), minMax("y")(a[1], b)];

      const initialValue = [
        [10000000, 0],
        [10000000, 0],
      ];

      const [[minX, maxX], [minY, maxY]] = pointData.reduce(
        minMaxXY,
        initialValue
      );

      // Calculate WCS boundry size
      const wcsW = maxY - minY;
      const wcsH = maxX - minX;

      // Calculate scaling factor
      const sX = h / wcsH;
      const sY = w / wcsW;

      // Set scale and translation
      setScale(Math.min(sX, sY));
      setTranslation([minX, minY]);
    }
  }, [w, h, points]);

  // Having scale and translation, draw the points
  useEffect(() => {
    if (scale > 0) {
      console.log(scale);
      const trPtToWCS = (s, t) => (x, y) => [x / s + t[0], y / s + t[1]];
      const trPtToWCS1 = trPtToWCS(scale, translation);

      const trPtToC = (s, t) => (x, y) => [(x - t[0]) * s, (y - t[1]) * s];
      const trPtToC1 = trPtToC(scale, translation);
      const trArrToPt = (pt) => {
        const [x, y] = trPtToC1(pt.x, pt.y);
        return { ...pt, x, y };
      };

      // Calcualte canvas boundry in WCS space
      const canvasWCSRect = [trPtToWCS1(0, 0), trPtToWCS1(h, w)];

      // Filter points based on bounding box
      const inRec = (bRect) => (pt) =>
        pt.x >= bRect[0][0] &&
        pt.x <= bRect[1][0] &&
        pt.y >= bRect[0][1] &&
        pt.y <= bRect[1][1];

      const fPoints = points
        .map(({ data }) => ({
          n: data.n,
          x: +data.x,
          y: +data.y,
          h: +data.h,
          c: data.c,
        }))
        .filter(inRec(canvasWCSRect))
        // Transform all points to canvas space
        .map(trArrToPt);

      // Draw points
      const ctx = canvasRef.current.getContext("2d");
      ctx.beginPath();

      fPoints.forEach(({ x, y }) => {
        ctx.moveTo(y, h - x);
        ctx.lineTo(y + 5, h - x + 5);
      });

      ctx.stroke();
    }
  }, [scale, translation, points, canvasRef]);

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
    </div>
  );
};

export default KrokiCanvas;
