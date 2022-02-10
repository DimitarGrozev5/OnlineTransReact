import React, { useEffect, useState } from "react";
// import classes from "./DataInput.module.css";
import DataInputControls from "./DataInputControls";
import TextArea from "./TextArea";
import TextAreaWraper from "./TextAreaWraper";
import TextAreaRow from "./TextAreaRow";
import { useDispatch, useSelector } from "react-redux";
import guessCsThunk from "../../../store/thunks-hint/guess-cs";
import Draggable from "./Draggable";
import addMessageThunk from "../../../store/thunks-messages/add-message";
import pasteThunk from "../../../store/thunks/paste";

// Function that reads a text file and returns a promise
const ReadFileAsText = (file) =>
  new Promise((resolve, reject) => {
    const promise = new FileReader();
    promise.addEventListener("load", (event) => {
      resolve(event.target.result);
    });
    promise.addEventListener("error", () => reject());
    promise.readAsText(file);
  });

const DataInput = (props) => {
  const selected = useSelector((state) => state.systems.selectedSystems.input);
  const firstLine = useSelector((state) => state.inputData.data[0]);
  const dispatch = useDispatch();

  // Saving the first line on typing
  useEffect(() => {
    dispatch(guessCsThunk(firstLine));
  }, [firstLine, selected, dispatch]);

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

  const openFileHandler = (files) => {
    const arrFiles = Array.from(files).filter(
      (file) => file.type === "text/plain"
    );

    if (arrFiles.length !== files.length) {
      dispatch(addMessageThunk("Приемат се само текстови файлове", null));
    }

    arrFiles.forEach((file) => {
      ReadFileAsText(file)
        .then((res) => {
          dispatch(
            pasteThunk(
              allowedDividers.filter((div) => div.on),
              res
            )
          );
        })
        .catch(() =>
          dispatch(
            addMessageThunk("Проблем при отваряне на файл " + file.name, null)
          )
        );
    });
  };

  return (
    <React.Fragment>
      <DataInputControls
        onOpenFile={openFileHandler}
        wrap={wrap}
        onChangeWrap={changeWrapHandler}
        allowedDividers={allowedDividers}
        onToggleDivider={toggleDividerHandler}
      />
      <Draggable onDrop={openFileHandler}>
        <TextAreaWraper cs={selected.xy} hs={selected.h}>
          <table>
            <thead>
              <TextAreaRow wrap={wrap} header dataSource="input" />
            </thead>
            <TextArea
              wrap={wrap}
              allowedDividers={allowedDividers.filter((div) => div.on)}
              dataSource="input"
            />
          </table>
        </TextAreaWraper>
      </Draggable>
    </React.Fragment>
  );
};

export default React.memo(DataInput);
