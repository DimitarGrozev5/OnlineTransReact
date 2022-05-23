import React, { useEffect, useState } from "react";
// import classes from "./DataInput.module.css";
import DataInputControls from "../../DataInputControls";
import TextArea from "../../TextArea";
import TextAreaWraper from "../../TextAreaWraper";
import TextAreaRow from "../../TextAreaRow";
import { useDispatch, useSelector } from "react-redux";
import guessCsThunk from "../../../../../store/thunks-hint/guess-cs";
import Draggable from "../../Draggable";
import addMessageThunk from "../../../../../store/thunks-messages/add-message";
import pasteThunk from "../../../../../store/thunks/textarea-thunks/paste";
import readDxfThunk from "../../../../../store/thunks/textarea-thunks/readDxfThunk";
import DxfOverview from "../../DxfOverview";
import { ReadFileAsText } from "../../../../../utils/read-file-as-text";
import { useTextAreaDividers } from "../hooks/useTextAreaDividers";

const DataInput = (props) => {
  const dispatch = useDispatch();

  // Getting the selected cs and hs for styling purposes
  const selected = useSelector((state) => state.systems.selectedSystems.input);

  // Getting the first line of the text field
  // It's used for making hints
  const firstLine = useSelector((state) => state.inputData.data[0]);

  // When the first line changes, make a new cs guess
  useEffect(() => {
    dispatch(guessCsThunk(firstLine));
  }, [firstLine, dispatch]);

  // Getting the dxfData if a DXF file is loaded
  const dxfData = useSelector((state) => state.inputData.dxfData);

  // Set state for wrap setting:
  // Makes a row of data wrap or no-wrap
  const [wrap, setWrap] = useState(true);
  const changeWrapHandler = () => {
    setWrap((prevState) => !prevState);
  };

  // Set state for dividers setting
  // Allowed dividers setting: The input text area uses different dividers
  const [allowedDividers, toggleDividerHandler] = useTextAreaDividers();

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

    // Save new dividers to localStorage if the user approved cookies
    const saveDividers = setTimeout(() => {
      if (localStorage.getItem("Cookie confirmed") === "confirmed") {
        localStorage.setItem("Dividers", JSON.stringify(allowedDividers));
      }
    }, 1000);

    return () => clearTimeout(saveDividers);
  }, [allowedDividers]);

  // Open file handler
  const openFileHandler = (files) => {
    if (files.length > 1) {
      dispatch(addMessageThunk("Приема се само един файл наведнъж", null));
    }

    const file = files[0];

    // Handle text file
    if (file.type === "text/plain") {
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
    }
    // Handle dxf file
    else if (file.name.split(".").pop().toLowerCase() === "dxf") {
      ReadFileAsText(file)
        .then((res) => {
          dispatch(readDxfThunk(res));
        })
        .catch((err) =>
          dispatch(
            addMessageThunk({
              msg:
                "Проблем при отваряне на файл " +
                file.name +
                "\n" +
                err.message,
            })
          )
        );
      // dispatch(
      //   addMessageThunk({
      //     msg: "Все още не се трансформират DXF файлове",
      //     timeout: 2000,
      //   })
      // );
    }
    // Handle other formats
    else {
      dispatch(
        addMessageThunk({
          msg: "Приемат се само .txt и .dxf файлове",
        })
      );
    }
  };

  return (
    <React.Fragment>
      {!dxfData && (
        <DataInputControls
          onOpenFile={openFileHandler}
          wrap={wrap}
          displayMode={textareaDisplayMode}
          onChangeWrap={changeWrapHandler}
          allowedDividers={allowedDividers}
          onToggleDivider={toggleDividerHandler}
        />
      )}

      <Draggable onDrop={openFileHandler}>
        <TextAreaWraper cs={selected.xy} hs={selected.h}>
          {!dxfData && (
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
          )}
          {dxfData && <DxfOverview data={dxfData} />}
        </TextAreaWraper>
      </Draggable>
    </React.Fragment>
  );
};

export default React.memo(DataInput);
