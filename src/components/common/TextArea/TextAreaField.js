import { useContext, useState, useRef } from "react";
import SystemsContext from "../../../store/systems-context";
import classes from "./TextAreaField.module.css";

const TextAreaField = (props) => {
  const ctx = useContext(SystemsContext);

  const inputFieldRef = useRef();

  const [isInput, setIsInput] = useState(false);
  const clickHandler = (event) => {
    setIsInput(true);
    inputFieldRef.current.click();
  }

  return (
    <div
      className={`${classes.field} ${props.header ? classes.header : ""} ${
        classes[ctx.selectedInputCS]
      } ${classes[ctx.selectedInputHS]}`}
      onClick={clickHandler}
    >
      {!isInput && props.value}
      {isInput && <input type="text" ref={inputFieldRef} defaultValue={props.value} />}
    </div>
  );
};

export default TextAreaField;
