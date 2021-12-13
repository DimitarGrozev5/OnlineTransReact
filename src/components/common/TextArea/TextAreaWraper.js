import classes from "./TextAreaWraper.module.css";
const TextAreaWraper = (props) => {
  return (
    <div
      className={`${classes["text-area"]} ${classes[props.cs]} ${
        classes[props.hs]
      }`}
    >
      {props.children}
    </div>
  );
};

export default TextAreaWraper;
