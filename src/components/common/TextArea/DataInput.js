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
  }, [firstLine, dispatch]);

  //Wrap setting: Makes a row of data wrap or no-wrap
  const [wrap, setWrap] = useState(true);
  const changeWrapHandler = () => {
    setWrap((prevState) => !prevState);
  };

  //Allowed dividers setting: The input text area uses different dividers
  // Get dividers from localStorage
  let initDividers = [
    {
      regex: / /,
      regexAlt: " ",
      caption: "Интервал",
      on: true,
      name: "mode-space",
    },
    {
      regex: /\|/,
      regexAlt: "\\|",
      caption: "Черта |",
      on: true,
      name: "mode-line",
    },
    {
      regex: /,/,
      regexAlt: ",",
      caption: "Запетая",
      on: true,
      name: "mode-comma",
    },
    {
      regex: /Tab/,
      regexAlt: "\\t",
      caption: "Таб",
      on: true,
      name: "mode-tab",
    },
  ];
  // if (localStorage.getItem("dividers")) {
  //   initDividers = JSON.parse(localStorage.getItem("dividers"));
  // }

  const [allowedDividers, setAllowedDividers] = useState(initDividers);
  const toggleDividerHandler = (index) => {
    setAllowedDividers((dividers) => {
      const divs = [...dividers];
      divs[index] = { ...divs[index], on: !dividers[index].on };
      return divs;
    });
  };

  // Set display mode
  const [textareaDisplayMode, setTextareaDisplayMode] = useState("mode-tab");
  // The display mode changes automatically if only one divider is selected
  useEffect(() => {
    const dividersOn = allowedDividers
      .filter((div) => div.on)
      .map((div) => div.name);

    if (dividersOn.length === 1) {
      setTextareaDisplayMode(dividersOn[0]);
    } else {
      setTextareaDisplayMode("mode-tab");
    }
  }, [allowedDividers]);

  // Open file handler
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
            addMessageThunk({
              msg: "Проблем при отваряне на файл " + file.name,
            })
          )
        );
    });
  };

  return (
    <React.Fragment>
      <DataInputControls
        onOpenFile={openFileHandler}
        wrap={wrap}
        displayMode={textareaDisplayMode}
        onChangeWrap={changeWrapHandler}
        allowedDividers={allowedDividers}
        onToggleDivider={toggleDividerHandler}
      />
      <Draggable onDrop={openFileHandler}>
        <TextAreaWraper cs={selected.xy} hs={selected.h}>
          <table>
            <thead>
              <TextAreaRow
                wrap={wrap}
                header
                dataSource="input"
                displayMode={textareaDisplayMode}
              />
            </thead>
            <TextArea
              wrap={wrap}
              displayMode={textareaDisplayMode}
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
