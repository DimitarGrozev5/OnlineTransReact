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
      // Get points bounding box

      const pointData = points.map(({ data }) => data);

      const min = (arg) => (a, b) => a < b[arg] ? a : b[arg];
      const max = (arg) => (a, b) => a > b[arg] ? a : b[arg];

      const selectFromList = (initialValue, fn, theList) =>
        theList.reduce((currentVal, x) => fn(currentVal, x), initialValue);

      const minX = selectFromList(10000000, min("x"), pointData);
      const minY = selectFromList(10000000, min("y"), pointData);
      const maxX = selectFromList(0, max("x"), pointData);
      const maxY = selectFromList(0, max("y"), pointData);
      console.log(minX, minY, maxX, maxY);
    }
  }, [w, h]);

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
    </div>
  );
};

export default KrokiCanvas;
