import React, { useRef } from "react";
import classes from "./TextArea.module.css";
import TextAreaRow from "./TextAreaRow";
import useDocumentSelection from "../../../hooks/use-document-selection";
import { useSelector } from "react-redux";
import { useMouseEvents } from "../../../hooks/use-mouse-events";
import useCommandQueue from "../../../hooks/use-command-queue";

const TextArea = (props) => {
  const rows = useSelector((state) => state.inputData.rows);

  //Hook that changes the ctx.inputData.range when the document selection changes
  useDocumentSelection();

  //TextArea click handler
  const textAreaRef = useRef();
  const clickHandler = (event) => {
    if (event.target === textAreaRef.current) {
      //console.log("click");
    }
  };

  //Initialize listening for drag events on the text area
  useMouseEvents(textAreaRef, "inputTextArea");

  //Probably useless--->
  //Initialize command queue
  // const selectorFn = (state) => {
  //   return state.inputData.nextCmdOnQueue;
  // };
  // const addCmdToQueue = useCommandQueue(selectorFn);

  return (
    <React.Fragment>
      <TextAreaRow wrap={props.wrap} header />
      <div
        className={classes["input-area"]}
        data-type="area"
        ref={textAreaRef}
        onClick={clickHandler}
      >
        {rows.map(({ id, fields }) => {
          return (
            <TextAreaRow
              wrap={props.wrap}
              allowedDividers={props.allowedDividers}
              key={id}
              row={id}
              fields={fields}
              //Probably useless
              //onAddCmdToQueue={addCmdToQueue}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default TextArea;
