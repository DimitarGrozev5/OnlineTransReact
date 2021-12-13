import React, { useContext } from "react";
import { useState } from "react/cjs/react.development";
import SystemsContext from "../../../store/systems-context";
import classes from "./DataInput.module.css";
import DataInputControls from "./DataInputControls";
import TextArea from "./TextArea";
import TextAreaWraper from "./TextAreaWraper";

const DataInput = (props) => {
  const ctx = useContext(SystemsContext);

  const [wrap, setWrap] = useState(true);
  const changeWrapHandler = () => {
    setWrap((prevState) => !prevState);
  }

  return (
    <React.Fragment>
      <DataInputControls wrap={wrap} onChangeWrap={changeWrapHandler} />
      <TextAreaWraper cs={ctx.selectedInputCS} hs={ctx.selectedInputHS}>
        <TextArea wrap={wrap} />
      </TextAreaWraper>
    </React.Fragment>
  );
};

export default DataInput;
