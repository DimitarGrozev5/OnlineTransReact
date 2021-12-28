import { useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import useGetInput from "../../../hooks/use-input";
import { dragHasHappened } from "../../../hooks/use-mouse-events";
import { inputDataActions } from "../../../store/input-data";
//import { useState } from "react/cjs/react.development";
import SystemsContext from "../../../store/systems-context";
import classes from "./TextAreaField.module.css";

const TextAreaField = (props) => {
  const ctx = useContext(SystemsContext);

  const dispatch = useDispatch();

  //A Ref that holds the current field
  const fieldRef = useRef();

  //A State that changes contenteditable prop
  // const [editable, setEditable] = useState(false);

  //If the field is editable on Mouse Down, then the user is limited to selecting only within the field

  const clickHandler = (event) => {
    !dragHasHappened["inputTextArea"] && dispatch(inputDataActions.makeFieldEditable({ fieldId: props.fieldId }));
  };
  const makeUneditableHandler = (event) => {
    dispatch(inputDataActions.makeFieldsUneditable());
  };

  const userInputHandler = (input) => {
    console.log(input);
  }
  const eventHandlers = useGetInput(userInputHandler);

  // const inputHandler = (event) => {
  //   const inputIsDivider = props.allowedDividers.reduce((result, divider) => {
  //     return divider.regex.test(event.nativeEvent.data) || result;
  //   }, false);

  //   if (inputIsDivider) {
  //     //const oldFieldValue = event.target.innerText.substring();
  //     console.log("divide")
  //     //ctx.splitField(props.row, props.field, oldFieldValue, newFieldValue);
  //   }
  //   //console.log(event.nativeEvent.getTargetRanges())
  // }

  // const keyDownHandler = (event) => {
  //   console.log("keydown")
  // }

  //An Effect that brings focus to the current field if it is made editable
  //Without this Side effect the user clicks on the field but the cursor doesn't appear
  useEffect(() => {
    if (props.editable) {
      fieldRef.current.focus();
    }
  }, [props.editable, fieldRef]);

  return (
    <div
      ref={fieldRef}
      className={`${classes.field} ${props.header ? classes.header : ""} ${
        classes[ctx.selectedInputCS]
      } ${classes[ctx.selectedInputHS]}`}
      data-type="field"
      id={props.fieldId}
      data-id={props.fieldId}
      tabIndex="0"
      contentEditable={props.editable}
      suppressContentEditableWarning={true}
      onClick={clickHandler}
      onMouseDown={makeUneditableHandler}
      onBlur={makeUneditableHandler}
      {...eventHandlers}
      //{...eventHandlers}
      // onInput={inputHandler}
      // onKeyDown={keyDownHandler}
    >
      {props.value}
    </div>
  );
};

export default TextAreaField;
