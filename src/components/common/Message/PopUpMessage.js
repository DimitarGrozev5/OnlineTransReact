import styles from "./PopUpMessage.module.css";

const PopUpMessage = (props) => {
  return (
    <div className={styles["pop-up"]}>
      <div>{props.content}</div>
      <button onClick={props.confirm}>ОК</button>
    </div>
  );
};

export default PopUpMessage;
