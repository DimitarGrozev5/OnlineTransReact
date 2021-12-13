import TextAreaField from "./TextAreaField";
import classes from "./TextAreaRow.module.css";

const TextAreaRow = (props) => {
  if (props.header) {
    return (
      <div className={`${classes.row} ${classes.header} ${props.wrap ? classes.wrap : ""}`}>
        <TextAreaField header={props.header} value="№" />
        <TextAreaField header={props.header} value="X" />
        <TextAreaField header={props.header} value="Y" />
        <TextAreaField header={props.header} value="H" />
        <TextAreaField header={props.header} value="Code" />
      </div>
    );
  }

  const fields = Array.from(props.fields.entries());

  return (
    <div className={`${classes.row} ${props.wrap ? classes.wrap : ""}`}>
      {fields.map(([key, field]) => {
        return <TextAreaField header={props.header} key={key} value={field} />;
      })}
    </div>
  );
};

export default TextAreaRow;
