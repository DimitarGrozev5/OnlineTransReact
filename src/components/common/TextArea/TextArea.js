import React, { useContext } from "react";
import classes from "./TextArea.module.css";
import SystemsContext from "../../../store/systems-context";
import TextAreaRow from "./TextAreaRow";

const TextArea = (props) => {
  const ctx = useContext(SystemsContext);
  
  return (
    <React.Fragment>
      <TextAreaRow wrap={props.wrap} header />
      <div className={classes["input-area"]}>
        {ctx.inputData.map(({id, fields}) => {
          return <TextAreaRow wrap={props.wrap} key={id} fields={fields} />;
        })}
      </div>
    </React.Fragment>
  );
};

export default TextArea;
