import { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useManageInput from "../../../hooks/use-input";
import { dragHasHappened } from "../../../hooks/use-mouse-events";
import { constructFieldId } from "../../../store/helpers/deconstruct-id";
import { getFieldProp } from "../../../store/helpers/field-prop";
import { inputDataActions } from "../../../store/input-data";
import SystemsContext from "../../../store/systems-context";
import classes from "./TextAreaField.module.css";

const TextAreaField = (props) => {
  const ctx = useContext(SystemsContext);
  const fieldIsEditable = useSelector(
    (state) =>
      !props.header &&
      getFieldProp(
        state.inputData,
        props.rowIndex,
        props.fieldIndex,
        "editable"
      )
  );
  const fieldValue = useSelector(
    (state) =>
      !props.header &&
      getFieldProp(state.inputData, props.rowIndex, props.fieldIndex, "value")
  );

  const dispatch = useDispatch();

  //A Ref that holds the current field
  const fieldRef = useRef();

  //If the field is editable on Mouse Down, then the user is limited to selecting only within the field

  const clickHandler = (event) => {
    !dragHasHappened["inputTextArea"] &&
      dispatch(
        inputDataActions.makeFieldEditable({
          fieldId: `${props.rowIndex}-${props.fieldIndex}`,
        })
      );
  };
  const makeUneditableHandler = (event) => {
    dispatch(inputDataActions.makeFieldsUneditable());
  };

  const eventHandlers = useManageInput(props.allowedDividers);

  //An Effect that brings focus to the current field if it is made editable
  //Without this Side effect the user clicks on the field but the cursor doesn't appear
  useEffect(() => {
    if (fieldIsEditable) {
      fieldRef.current.focus();
    }
  }, [fieldIsEditable, fieldRef]);

  return (
    <div
      ref={fieldRef}
      className={`${classes.field} ${props.header ? classes.header : ""} ${
        classes[ctx.selectedInputCS]
      } ${classes[ctx.selectedInputHS]}`}
      data-type="field"
      id={constructFieldId(props.rowIndex, props.fieldIndex)}
      data-id={constructFieldId(props.rowIndex, props.fieldIndex)}
      tabIndex="0"
      contentEditable={fieldIsEditable}
      suppressContentEditableWarning={true}
      onClick={clickHandler}
      onMouseDown={makeUneditableHandler}
      onBlur={makeUneditableHandler}
      {...eventHandlers}
      //{...eventHandlers}
      // onInput={inputHandler}
      // onKeyDown={keyDownHandler}
    >
      {props.header && props.value}
      {!props.header && fieldValue}
    </div>
  );
};

export default TextAreaField;
