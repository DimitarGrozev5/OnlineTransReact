import React, { useContext } from "react";
import SystemsContext from "../../../store/systems-context";
import classes from "./DataInput.module.css";
import TextArea from "./TextArea";
import TextAreaWraper from "./TextAreaWraper";

const DataInput = (props) => {
  const ctx = useContext(SystemsContext);
  return (
    <React.Fragment>
      <div>Controls</div>
      <TextAreaWraper cs={ctx.selectedInputCS} hs={ctx.selectedInputHS}>
        <div>Header</div>
        <TextArea />
      </TextAreaWraper>
    </React.Fragment>
  );
};

export default DataInput;
