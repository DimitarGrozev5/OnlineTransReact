import React, { useContext,  } from "react";
import {  useSelector } from "react-redux";
import { constructFieldId } from "../../../store/helpers/deconstruct-id";
import { getFieldProp } from "../../../store/helpers/field-prop";
import SystemsContext from "../../../store/systems-context";
import classes from "./TextAreaField.module.css";

const TextAreaField = (props) => {
  const ctx = useContext(SystemsContext);

  const fieldValue = useSelector(
    (state) =>
      !props.header &&
      getFieldProp(state.inputData, props.rowIndex, props.fieldIndex, "value")
  );

  return (
    <div
      className={`${classes.field} ${props.header ? classes.header : ""} ${
        classes[ctx.selectedInputCS]
      } ${classes[ctx.selectedInputHS]}`}
      id={constructFieldId(props.rowIndex, props.fieldIndex)}
      data-id={!props.header && constructFieldId(props.rowIndex, props.fieldIndex)}
    >
      {props.header && props.value}
      {!props.header && fieldValue}
    </div>
  );
};

export default React.memo(TextAreaField);
