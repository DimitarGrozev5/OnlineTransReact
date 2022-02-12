import React, { useRef, useState } from "react";
import classes from "./MobileHeader.module.css";

import menu from "../../resources/menu_icon.svg";
import Modal from "./modal/Modal";
import MobileDrawer from "./MobileDrawer";

const MobileHeader = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openMenuHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeMenuHandler = () => {
    setDrawerIsOpen(false);
  };

  const modalRef = useRef();
  return (
    <header className={classes.header}>
      <h1>OnlineTrans</h1>
      <menu>
        <button onClick={openMenuHandler}>
          <img alt="Menu" src={menu} />
        </button>
        {drawerIsOpen && (
          <Modal ref={modalRef} onClose={closeMenuHandler}>
            <MobileDrawer onClose={closeMenuHandler} />
          </Modal>
        )}
      </menu>
    </header>
  );
};

export default MobileHeader;
