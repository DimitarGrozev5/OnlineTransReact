import TextAreaField from "./TextAreaField";
import classes from "./TextAreaRow.module.css";

const TextAreaRow = (props) => {
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
      key={props.row}
    >
      {props.fields.map(({ id, value, editable }) => {
        return (
          <TextAreaField
            allowedDividers={props.allowedDividers}
            header={props.header}
            key={id}
            row={props.row}
            fieldId={id}
            editable={editable}
            value={value}
          />
        );
      })}
    </div>
  );
};

export default TextAreaRow;
