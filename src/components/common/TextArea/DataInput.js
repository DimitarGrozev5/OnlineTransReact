import React, { useState } from "react";
import classes from "./DataInput.module.css";
import DataInputControls from "./DataInputControls";
import TextArea from "./TextArea";
import TextAreaWraper from "./TextAreaWraper";
import TextAreaRow from "./TextAreaRow";
import { useSelector } from "react-redux";

const DataInput = (props) => {
  const selected = useSelector((state) => state.systems.selectedSystems.input);

  //Wrap setting: Makes a row of data wrap or no-wrap
  const [wrap, setWrap] = useState(true);
  const changeWrapHandler = () => {
    setWrap((prevState) => !prevState);
  };

  //Allowed dividers setting: The input text area uses different dividers
  const [allowedDividers, setAllowedDividers] = useState([
    { regex: / /, regexAlt: " ", caption: "Шпация", on: true },
    { regex: /\|/, regexAlt: "\\|", caption: "Черта |", on: true },
    { regex: /,/, regexAlt: ",", caption: "Запетая", on: true },
    //{ regex: /\t/, caption: "Таб", on: true },
    { regex: /Tab/, regexAlt: "\\t", caption: "Таб", on: true },
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
      <TextAreaWraper cs={selected.xy} hs={selected.h}>
        <div className={classes.table}>
          <table>
            <thead>
              <TextAreaRow wrap={wrap} header />
            </thead>
            <TextArea
              wrap={wrap}
              allowedDividers={allowedDividers.filter((div) => div.on)}
            />
          </table>
        </div>
      </TextAreaWraper>
    </React.Fragment>
  );
};

export default DataInput;
