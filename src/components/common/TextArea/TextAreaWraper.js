import classes from "./TextAreaWraper.module.css";
const TextAreaWraper = (props) => {
  return (
    <div
      className={`${classes["text-area"]} ${classes[props.cs]} ${
        classes[props.hs]
      }`}
    >
      <div className={classes.table}>{props.children}</div>
    </div>
  );
};

export default TextAreaWraper;
