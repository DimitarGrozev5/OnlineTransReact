import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { inputDataActions } from "../../../../../store/input-data";
import classes from "./DataInputControls.module.css";

const DataInputControls = (props) => {
  const [showDividerSelect, setShowDividerSelect] = useState(false);
  const dispatch = useDispatch();

  const toggleDividersHandler = () => {
    setShowDividerSelect((state) => !state);
  };

  const undoHandler = () => {
    dispatch(inputDataActions.undo());
  };
  const redoHandler = () => {
    dispatch(inputDataActions.redo());
  };

  const fileInputRef = useRef();

  const openFileUploadDialog = () => {
    fileInputRef.current.click();
  };

  const fileIsLoadedHandler = (event) => {
    props.onOpenFile(event.target.files);
  };

  return (
    <div className={classes.controls}>
      <input ref={fileInputRef} type="file" onChange={fileIsLoadedHandler} />
      <button onClick={openFileUploadDialog}>Отвори файл</button>
      <button onClick={props.onChangeWrap}>
        {props.wrap ? "No-Wrap" : "Wrap"}
      </button>
      <div className={classes["pop-up-container"]}>
        <button onClick={toggleDividersHandler}>Разделители</button>
        {showDividerSelect && (
          <div className={classes["pop-up"]}>
            {props.allowedDividers.map((divider, index) => {
              return (
                <div key={index} className={classes["pop-up__row"]}>
                  <div>
                    <input
                      type="checkbox"
                      checked={divider.on}
                      onChange={props.onToggleDivider.bind(null, index)}
                    />
                  </div>
                  <div>{divider.caption}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <button onClick={undoHandler}>Undo</button>
      <button onClick={redoHandler}>Redo</button>
    </div>
  );
};

export default DataInputControls;
