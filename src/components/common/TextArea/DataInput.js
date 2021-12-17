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
    { regex: / /, caption: "Шпация", on: true },
    { regex: /\|/, caption: "Черта |", on: true },
    { regex: /,/, caption: "Запетая", on: true },
    { regex: /\t/, caption: "Таб", on: true },
  ]);
  const toggleDividerHandler = (index) => {
    setAllowedDividers((dividers) => {
      const divs = [...dividers];
      divs[index] = { ...divs[index], on: !dividers[index].on };
      return divs;
    });
  };

  return (
    <React.Fragment>
      <DataInputControls
        wrap={wrap}
        onChangeWrap={changeWrapHandler}
        allowedDividers={allowedDividers}
        onToggleDivider={toggleDividerHandler}
      />
      <TextAreaWraper cs={ctx.selectedInputCS} hs={ctx.selectedInputHS}>
        <TextArea
          wrap={wrap}
          allowedDividers={allowedDividers.filter((div) => div.on)}
        />
      </TextAreaWraper>
    </React.Fragment>
  );
};

export default DataInput;
