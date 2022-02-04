import React, { useRef } from "react";
import classes from "./TextArea.module.css";
import TextAreaRow from "./TextAreaRow";
import { useSelector } from "react-redux";
import { useMouseEvents } from "../../../hooks/use-mouse-events";
import useApplySelection from "../../../hooks/use-apply-selection";
import useManageInput from "../../../hooks/use-input";

const TextArea = (props) => {
  const rows = useSelector((state) => state.inputData.data);
  const textAreaRef = useRef();

  //Hook that changes the ctx.inputData.range when the document selection changes
  useApplySelection();
  const eventHandlers = useManageInput(props.allowedDividers, textAreaRef);

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
              wrap={props.wrap}
              allowedDividers={props.allowedDividers}
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
