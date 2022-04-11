import { useEffect, useRef } from "react";
import styles from "./KrokiCanvas.module.css";

const KrokiCanvas = ({ points }) => {
  const containerRef = useRef();
  const canvasRef = useRef();

  

  useEffect(() => {
    canvasRef.current.width = containerRef.current.clientWidth;
    canvasRef.current.height = containerRef.current.clientHeight;
  }, [canvasRef, containerRef]);

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
    </div>
  );
};

export default KrokiCanvas;
