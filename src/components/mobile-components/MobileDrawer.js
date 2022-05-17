import React, { useState } from "react";
import AccordionViewer from "../common/info/AccordionViewer";
import { FAQ_content } from "../common/info/faq-data";
import classes from "./MobileDrawer.module.css";

const MobileDrawer = (props) => {
  const [backStack, setBackStack] = useState([props.onClose]);

  const backHandler = () => {
    const lastAction = backStack[backStack.length - 1];
    lastAction();
    setBackStack((state) => state.slice(0, state.length - 1));
  };

  const addActionToBackStack = (action) => {
    setBackStack((state) => [...state, action]);
  };

  const [activePage, setActivePage] = useState(0);
  const changePageHandler = (target) => () => {
    setActivePage(target);
    addActionToBackStack(setActivePage.bind(null, 0));
  };

  return (
    <React.Fragment>
      <div className={classes["go-back"]}>
        <button onClick={backHandler}>Назад</button>
      </div>
      {activePage === 0 && (
        <div>
          <button className={classes.link} onClick={changePageHandler(1)}>
            Често задавани въпроси
          </button>
          {/* <button className={classes.link} onClick={changePageHandler(2)}>
            Как се работи със сайта
          </button>
          <button className={classes.link} onClick={changePageHandler(3)}>Контакти</button> */}
        </div>
      )}
      {activePage === 1 && (
        <div className={classes.container}>
          <AccordionViewer
            onOpen={addActionToBackStack}
            content={FAQ_content}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default MobileDrawer;
