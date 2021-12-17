import { useContext, useEffect, useRef } from "react";
import { useState } from "react/cjs/react.development";
import SystemsContext from "../../../store/systems-context";
import classes from "./TextAreaField.module.css";

const TextAreaField = (props) => {
  const ctx = useContext(SystemsContext);

  //A Ref that holds the current field
  const fieldRef = useRef();

  //A State that changes contenteditable prop
  const [editable, setEditable] = useState(false);

  //If the field is editable on Mouse Down, then the user is limited to selecting only within the field
  const mouseDownHandler = (event) => {
    setEditable(false);
  };

  const clickHandler = (event) => {
    setEditable(true);
  };
  const blurHandler = (event) => {
    setEditable(false);
    ctx.updateFieldValue(props.row, props.field, event.target.innerText);
  };

  const inputHandler = (event) => {
    // const inputIsDivider = props.allowedDividers.reduce((result, divider) => {
    //   return divider.regex.test(event.nativeEvent.data) || result;
    // }, false);
    
    // if (inputIsDivider) {
    //   const oldFieldValue = event.target.innerText.substring();
    //   ctx.splitField(props.row, props.field, oldFieldValue, newFieldValue);
    // }
    console.log(event.nativeEvent.getTargetRanges())
  }

  const keyDownHandler = (event) => {
    console.log("keydown")
  }

  //An Effect that brings focus to the current field if it is made editable
  //Without this Side effect the user clicks on the field but the cursor doesn't appear
  useEffect(() => {
    if (editable) {
      fieldRef.current.focus();
    }
  }, [editable, fieldRef]);

  return (
    <div
      ref={fieldRef}
      className={`${classes.field} ${props.header ? classes.header : ""} ${
        classes[ctx.selectedInputCS]
      } ${classes[ctx.selectedInputHS]}`}
      data-type="field"
      contentEditable={editable}
      suppressContentEditableWarning={true}
      onClick={clickHandler}
      onMouseDown={mouseDownHandler}
      onBlur={blurHandler}
      onInput={inputHandler}
      onKeyDown={keyDownHandler}
    >
      {props.value}
    </div>
  );
};

export default TextAreaField;
