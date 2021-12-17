import React, { useContext } from "react";
import { useState } from "react/cjs/react.development";
import SystemsContext from "../../../store/systems-context";
import classes from "./DataInput.module.css";
import DataInputControls from "./DataInputControls";
import TextArea from "./TextArea";
import TextAreaWraper from "./TextAreaWraper";

const DataInput = (props) => {
  const ctx = useContext(SystemsContext);

  //Wrap setting: Makes a row of data wrap or no-wrap
  const [wrap, setWrap] = useState(true);
  const changeWrapHandler = () => {
    setWrap((prevState) => !prevState);
  };

  //Allowed dividers setting: The input text area uses different dividers
  const [allowedDividers, setAllowedDividers] = useState([
    { divider: / /, caption: "Шпация", on: true },
    { divider: /\|/, caption: "Черта |", on: true },
    { divider: /,/, caption: "Запетая", on: true },
    { divider: /\t/, caption: "Таб", on: true },
  ]);

  return (
    <React.Fragment>
      <DataInputControls
        wrap={wrap}
        allowedDividers={allowedDividers}
        onChangeWrap={changeWrapHandler}
      />
      <TextAreaWraper cs={ctx.selectedInputCS} hs={ctx.selectedInputHS}>
        <TextArea wrap={wrap} />
      </TextAreaWraper>
    </React.Fragment>
  );
};

export default DataInput;
