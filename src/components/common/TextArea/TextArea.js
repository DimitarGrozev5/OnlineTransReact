import React, { useRef } from "react";
import classes from "./TextArea.module.css";
import TextAreaRow from "./TextAreaRow";
import { useSelector } from "react-redux";
import { useMouseEvents } from "../../../hooks/use-mouse-events";
import useApplySelection from "../../../hooks/use-apply-selection";
import useManageInput from "../../../hooks/use-input";

const TextArea = (props) => {
  const selector =
    props.dataSource === "input"
      ? (state) => state.inputData.data
      : (state) => state.systems.transformedData;
  const rows = useSelector(selector);
  const textAreaRef = useRef();

  // Test selection change
  // useDocumentSelection(textAreaRef);

  //Hook that changes the ctx.inputData.range when the document selection changes
  useApplySelection(props.dataSource);
  const eventHandlers = useManageInput(
    props.dataSource,
    props.allowedDividers,
    textAreaRef
  );

  //TextArea click handler
  const clickHandler = (event) => {
    if (event.target === textAreaRef.current) {
      //console.log("click");
    }
  };

  //Initialize listening for drag events on the text area
  useMouseEvents(textAreaRef, "inputTextArea");

  return (
    <React.Fragment>
      <tbody
        className={classes["input-area"]}
        data-type="area"
        ref={textAreaRef}
        onClick={clickHandler}
        contentEditable={true}
        suppressContentEditableWarning={true}
        {...eventHandlers}
      >
        {rows.map((row, rowIndex) => {
          return (
            <TextAreaRow
              dataSource={props.dataSource}
              displayMode={props.displayMode}
              wrap={props.wrap}
              key={rowIndex}
              rowIndex={rowIndex}
            />
          );
        })}
      </tbody>
    </React.Fragment>
  );
};

export default TextArea;
