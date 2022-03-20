import styles from "./KrokiBody.module.css";

const KrokiBody = () => {
  // On load check if there are points
  // If no, load them from the output data
  

  return (
    <div className={styles.main}>
      <div className={styles["actions"]}>actions</div>
      <div className={styles["results"]}>results</div>
      <div className={styles["points-container"]}>points</div>
      <div className={styles["canvas"]}>canvas</div>
    </div>
  );
};

export default KrokiBody;
