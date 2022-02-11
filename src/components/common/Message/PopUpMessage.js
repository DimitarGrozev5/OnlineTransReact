import styles from "./PopUpMessage.module.css";

const PopUpMessage = (props) => {
  return (
    <div
      className={
        styles["pop-up"] +
        " " +
        (props.content.cancelable ? styles.cancelable : "")
      }
    >
      <div>{props.content.msg}</div>
      <button onClick={props.confirm}>ОК</button>
      {props.content.cancelable && (
        <button onClick={props.cancel}>Cancel</button>
      )}
    </div>
  );
};

export default PopUpMessage;
