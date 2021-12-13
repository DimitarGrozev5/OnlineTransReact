import classes from "./TextAreaField.module.css";

const TextAreaField = props => {
  return <div className={classes.field}>{props.value}</div>
}

export default TextAreaField;