import { useRef } from "react";
import { useDispatch } from "react-redux";
import addMessageThunk from "../../../store/thunks-messages/add-message";
import classes from "./DataInputControls.module.css";

const DataOutputControls = (props) => {
  const dispatch = useDispatch();

  // Saving data to file
  const saveHref = useRef();
  const saveToFile = () => {
    const data = props.data.map((line) => line.join("\t")).join("\n");
    const blob = new Blob([data], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    saveHref.current.href = url;
    saveHref.current.download = `${props.systems.xy}.${props.systems.variant}.${props.systems.h}.txt`;
    saveHref.current.click();
  };

  const copyAllHandler = () => {
    const output = props.data.map((line) => line.join("\t")).join("\n");
    navigator.clipboard.writeText(output);
    dispatch(addMessageThunk({ msg: "Копирано", timeout: 2000 }));
  };

  return (
    <div className={classes.controls}>
      <button onClick={copyAllHandler}>Копирай всичко</button>
      <button onClick={props.onChangeWrap}>
        {props.wrap ? "No-Wrap" : "Wrap"}
      </button>
      <button onClick={saveToFile}>Save</button>
      <a ref={saveHref} className={classes["save-link"]}></a>
    </div>
  );
};

export default DataOutputControls;
