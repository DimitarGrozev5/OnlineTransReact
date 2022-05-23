import { useState } from "react";
import styles from "./Draggable.module.css";

const Draggable = (props) => {
  // 
  const [dragging, setDragging] = useState(0);

  const dragInHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragging((prev) => prev + 1);
  };

  const dragOutHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragging((prev) => prev - 1);
  };

  const dragHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const dropHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      props.onDrop(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
    setDragging(0);
  };

  return (
    <div
      onDragEnter={dragInHandler}
      onDragLeave={dragOutHandler}
      onDragOver={dragHandler}
      onDrop={dropHandler}
      className={styles.draggable}
    >
      <div className={styles.overlay + " " + (dragging > 0 && styles.dragging)}>
        Отваряне на файл
      </div>
      {props.children}
    </div>
  );
};

export default Draggable;
