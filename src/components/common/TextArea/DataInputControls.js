import { useDispatch } from "react-redux";
import { useState } from "react";
import { inputDataActions } from "../../../store/input-data";
//import classes from "./DataInputControls.module.css";

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

  return (
    <div>
      <button onClick={props.onChangeWrap}>
        {props.wrap ? "No-Wrap" : "Wrap"}
      </button>
      <div>
        <button onClick={toggleDividersHandler}>Разделители</button>
        {showDividerSelect && (
          <div>
            {props.allowedDividers.map((divider, index) => {
              return (
                <div key={index}>
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
