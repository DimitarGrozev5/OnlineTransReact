import React, { useContext } from "react";
import classes from "./TextArea.module.css";
import SystemsContext from "../../../store/systems-context";
import TextAreaRow from "./TextAreaRow";

const TextArea = (props) => {
  const ctx = useContext(SystemsContext);
  const inputData = Array.from(ctx.inputData.entries());

  return (
    <div className={classes["input-area"]}>
      {inputData.map(([key, row]) => {
        return <TextAreaRow key={key} fields={row} />;
      })}
    </div>
  );
};

export default TextArea;
