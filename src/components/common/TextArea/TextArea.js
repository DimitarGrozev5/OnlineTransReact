import React, { useRef } from "react";
import classes from "./TextArea.module.css";
import TextAreaRow from "./TextAreaRow";
import useDocumentSelection from "../../../hooks/use-document-selection";
import { useSelector } from "react-redux";
import { useMouseEvents } from "../../../hooks/use-mouse-events";
import useApplySelection from "../../../hooks/use-apply-selection";

const TextArea = (props) => {
  const rows = useSelector((state) => state.inputData.rows);

  //Hook that changes the ctx.inputData.range when the document selection changes
  useDocumentSelection();
  useApplySelection();

  //TextArea click handler
  const textAreaRef = useRef();
  const clickHandler = (event) => {
    if (event.target === textAreaRef.current) {
      //console.log("click");
    }
  };

  //Initialize listening for drag events on the text area
  useMouseEvents(textAreaRef, "inputTextArea");

  return (
    <React.Fragment>
      <TextAreaRow wrap={props.wrap} header />
      <div
        className={classes["input-area"]}
        data-type="area"
        ref={textAreaRef}
        onClick={clickHandler}
      >
        text
        {rows.map(({ id }, rowIndex) => {
          return (
            <TextAreaRow
              wrap={props.wrap}
              allowedDividers={props.allowedDividers}
              key={rowIndex}
              row={id}
              rowIndex={rowIndex}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default TextArea;
