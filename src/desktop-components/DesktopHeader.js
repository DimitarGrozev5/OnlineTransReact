import { useState } from "react";
import FAQ from "../components/common/info/FAQ";
import Modal from "../components/common/modal/Modal";
import styles from "./DesktopHeader.module.css";

const DesktopHeader = (props) => {
  const [popUpIsOpen, setPopUpIsOpen] = useState(false);

  const openMenuHandler = () => {
    setPopUpIsOpen(true);
  };

  const closeMenuHandler = () => {
    setPopUpIsOpen(false);
  };
  return (
    <div className={styles.header}>
      <h1>OnlineTrans</h1>
      <nav>
        {popUpIsOpen && (
          <Modal onClose={closeMenuHandler}>
            <div className={styles["close-pop-up"]}>
              <button className={styles["close-pop-up__button"]} onClick={closeMenuHandler}>X</button>
            </div>
            <div className={styles["modal-content"]}>
              <FAQ />
            </div>
          </Modal>
        )}
        <ul className={styles.navigation}>
          <li>
            <button onClick={openMenuHandler}>Често задавани въпроси</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DesktopHeader;
