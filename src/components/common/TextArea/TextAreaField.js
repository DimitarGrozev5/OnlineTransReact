import React from "react";
import { useSelector } from "react-redux";
import { constructFieldId } from "../../../store/helpers/deconstruct-id";
import { getFieldProp } from "../../../store/helpers/field-prop";
import classes from "./TextAreaField.module.css";

const TextAreaField = (props) => {
  const selected = useSelector((state) => state.systems.selectedSystems.input);

  const fieldValue = useSelector(
    (state) =>
      !props.header &&
      getFieldProp(state.inputData, props.rowIndex, props.fieldIndex, "value")
  );

  return (
    <React.Fragment>
      {props.header && (
        <th
          className={`${classes.field} ${classes.header} ${
            classes[selected.xy]
          } ${classes[selected.h]}`}
        >
          {props.value}
        </th>
      )}
      {!props.header && (
        <td
          className={`${classes.field} ${classes[selected.xy]} ${
            classes[selected.h]
          }`}
          id={constructFieldId(props.rowIndex, props.fieldIndex)}
          data-id={constructFieldId(props.rowIndex, props.fieldIndex)}
        >
          {fieldValue}
        </td>
      )}
    </React.Fragment>
  );
};

export default React.memo(TextAreaField);
