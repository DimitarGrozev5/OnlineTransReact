import { useState } from "react";
import AccordionViewer from "../common/info/AccordionViewer";
import { autoKroki_content } from "../common/info/auto-kroki-data";
import { FAQ_content } from "../common/info/faq-data";
import Modal from "../common/modal/Modal";
import styles from "./DesktopHeader.module.css";

const DesktopHeader = (props) => {
  // popUpIsOpen === "faq" -> Open FAQ
  // popUpIsOpen === "auto-kroki" -> Open AutoKroki Info
  const [popUpIsOpen, setPopUpIsOpen] = useState(false);

  const openMenuHandler = (window) => () => {
    setPopUpIsOpen(window);
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
              <button
                className={styles["close-pop-up__button"]}
                onClick={closeMenuHandler}
              >
                X
              </button>
            </div>
            <div className={styles["modal-content"]}>
              {popUpIsOpen === "faq" ? (
                <AccordionViewer content={FAQ_content} />
              ) : (
                <AccordionViewer content={autoKroki_content} />
              )}
            </div>
          </Modal>
        )}
        <ul className={styles.navigation}>
          <li>
            <button onClick={openMenuHandler("faq")}>
              Често задавани въпроси
            </button>
          </li>
          <li>
            <button onClick={openMenuHandler("auto-kroki")}>АвтоКроки</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DesktopHeader;
