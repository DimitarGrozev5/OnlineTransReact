import React, { useContext, useRef } from "react";
import classes from "./TextArea.module.css";
import SystemsContext from "../../../store/systems-context";
import TextAreaRow from "./TextAreaRow";
import useDocumentSelection from "../../../hooks/use-document-selection";

const TextArea = (props) => {
  const ctx = useContext(SystemsContext);

  //Hook that changes the ctx.inputData.range when the document selection changes
  useDocumentSelection();

  //TextArea click handler
  const textAreaRef = useRef();
  const clickHandler = (event) => {
    if (event.target === textAreaRef.current) {
      console.log("click");
    }
  };

  return (
    <React.Fragment>
      <TextAreaRow wrap={props.wrap} header />
      <div
        className={classes["input-area"]}
        data-type="area"
        ref={textAreaRef}
        onClick={clickHandler}
      >
        {ctx.inputData.rows.map(({ id, fields }) => {
          return (
            <TextAreaRow
              wrap={props.wrap}
              allowedDividers={props.allowedDividers}
              key={id}
              row={id}
              fields={fields}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default TextArea;
