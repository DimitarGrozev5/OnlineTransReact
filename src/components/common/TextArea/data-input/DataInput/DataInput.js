import React, { useEffect, useState } from "react";
import DataInputControls from "../../DataInputControls";
import TextArea from "../../TextArea";
import TextAreaWraper from "../../TextAreaWraper";
import TextAreaRow from "../../TextAreaRow";
import { useDispatch, useSelector } from "react-redux";
import guessCsThunk from "../../../../../store/thunks-hint/guess-cs";
import Draggable from "../../Draggable";
import DxfOverview from "../../DxfOverview";
import { useTextAreaDividers } from "../hooks/useTextAreaDividers";
import { useTextAreaOpenFile } from "../hooks/useTextAreaOpenFile";

const DataInput = () => {
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

  // Set display mode
  // The display mode change the divider between text area cells
  const [textareaDisplayMode, setTextareaDisplayMode] = useState("mode-tab");

  // Set state for dividers setting
  // Allowed dividers setting: The input text area uses different dividers
  // If only one divider is selected, the display mode changes
  const [allowedDividers, toggleDividerHandler] = useTextAreaDividers(
    setTextareaDisplayMode
  );

  // Open file handler
  const openFileHandler = useTextAreaOpenFile(allowedDividers);

  return (
    <>
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
    </>
  );
};

export default React.memo(DataInput);
