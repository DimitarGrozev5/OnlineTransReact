import React from "react";
import { useSelector } from "react-redux";
import { constructFieldId } from "../../../store/helpers/deconstruct-id";
import TextAreaField from "./TextAreaField";
import classes from "./TextAreaRow.module.css";

const TextAreaRow = (props) => {
  const selector =
    props.dataSource === "input"
      ? (state) => state.inputData.data[props.rowIndex]
      : (state) => state.systems.transformedData[props.rowIndex];
  const fields = useSelector((state) => props.header || selector(state));

  if (props.header) {
    return (
      <tr
        className={`${classes.row} ${classes.header} ${
          props.wrap ? classes.wrap : ""
        }`}
      >
        <TextAreaField header={props.header} value="№" />
        <TextAreaField header={props.header} value="X" />
        <TextAreaField header={props.header} value="Y" />
        <TextAreaField header={props.header} value="H" />
        <TextAreaField header={props.header} value="Code" />
      </tr>
    );
  }

  return (
    <tr
      className={`${classes.row} ${props.wrap ? classes.wrap : ""}`}
      data-type="row"
    >
      {fields.map((fieldValue, fieldIndex) => {
        return (
          <TextAreaField
            dataSource={props.dataSource}
            header={props.header}
            key={constructFieldId(props.rowIndex, fieldIndex)}
            rowIndex={props.rowIndex}
            fieldIndex={fieldIndex}
          />
        );
      })}
    </tr>
  );
};

export default React.memo(TextAreaRow);
