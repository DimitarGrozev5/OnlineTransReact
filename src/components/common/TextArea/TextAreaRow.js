import { useSelector } from "react-redux";
import TextAreaField from "./TextAreaField";
import classes from "./TextAreaRow.module.css";

const TextAreaRow = (props) => {
  const fields = useSelector((state) => props.header || state.inputData.rows[props.rowIndex].fields);

  if (props.header) {
    return (
      <div
        className={`${classes.row} ${classes.header} ${
          props.wrap ? classes.wrap : ""
        }`}
      >
        <TextAreaField header={props.header} value="№" />
        <TextAreaField header={props.header} value="X" />
        <TextAreaField header={props.header} value="Y" />
        <TextAreaField header={props.header} value="H" />
        <TextAreaField header={props.header} value="Code" />
      </div>
    );
  }

  return (
    <div
      className={`${classes.row} ${props.wrap ? classes.wrap : ""}`}
      data-type="row"
    >
      {fields.map(({ id }, fieldIndex) => {
        return (
          <TextAreaField
            allowedDividers={props.allowedDividers}
            header={props.header}
            key={`${props.rowIndex}-${fieldIndex}`}
            row={props.row}
            rowIndex={props.rowIndex}
            fieldId={id}
            fieldIndex={fieldIndex}
          />
        );
      })}
    </div>
  );
};

export default TextAreaRow;
