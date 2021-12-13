import React, { useContext } from "react";
import classes from "./TextArea.module.css";
import SystemsContext from "../../../store/systems-context";
import TextAreaRow from "./TextAreaRow";

const TextArea = (props) => {
  const ctx = useContext(SystemsContext);
  const inputData = Array.from(ctx.inputData.entries());

  return (
    <React.Fragment>
      <TextAreaRow wrap={props.wrap} header />
      <div className={classes["input-area"]}>
        {inputData.map(([key, row]) => {
          return <TextAreaRow wrap={props.wrap} key={key} fields={row} />;
        })}
      </div>
    </React.Fragment>
  );
};

export default TextArea;
