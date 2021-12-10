import React, { useState } from "react";
import classes from "./MobileHeader.module.css";

import menu from "../../resources/menu_icon.svg";
import Modal from "./modal/Modal";

const MobileHeader = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openMenuHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeMenuHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <header className={classes.header}>
      <h1>OnlineTrans</h1>
      <menu>
        <button onClick={openMenuHandler}>
          <img src={menu} />
        </button>
        {drawerIsOpen && (
          <Modal onClose={closeMenuHandler}>Modal is open</Modal>
        )}
      </menu>
    </header>
  );
};

export default MobileHeader;
