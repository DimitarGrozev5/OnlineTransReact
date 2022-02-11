import React from "react";
import { useSelector } from "react-redux";
import { constructFieldId } from "../../../store/helpers/deconstruct-id";
import classes from "./TextAreaField.module.css";
// import cssDisplayModes from "./TextAreaFieldDisplayModes.module.css";

const TextAreaField = (props) => {
  const selected = useSelector(
    (state) => state.systems.selectedSystems[props.dataSource]
  );

  const selector =
    props.dataSource === "input"
      ? (state) => state.inputData.data[props.rowIndex][props.fieldIndex]
      : (state) =>
          state.systems.transformedData[props.rowIndex][props.fieldIndex];
  const fieldValue = useSelector(
    (state) =>
      !props.header &&
      // getFieldProp(state.inputData, props.rowIndex, props.fieldIndex)
      selector(state)
  );

  return (
    <React.Fragment>
      {props.header && (
        <th
          className={
            classes.field +
            " " +
            classes.header +
            " " +
            classes[selected.xy] +
            " " +
            classes[selected.h] +
            " " +
            classes[props.displayMode]
          }
        >
          {props.value}
        </th>
      )}
      {!props.header && (
        <td
          className={
            classes.field +
            " " +
            classes[selected.xy] +
            " " +
            classes[selected.h] +
            " " +
            classes[props.displayMode]
          }
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
