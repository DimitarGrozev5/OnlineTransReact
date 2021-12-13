import TextAreaField from "./TextAreaField";
import classes from "./TextAreaRow.module.css";

const TextAreaRow = (props) => {
  const fields = Array.from(props.fields.entries());

  return (
    <div className={classes.row}>
      {fields.map(([key, field]) => {
        return <TextAreaField key={key} value={field} />;
      })}
    </div>
  );
};

export default TextAreaRow;
