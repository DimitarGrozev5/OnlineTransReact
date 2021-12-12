import React, { useContext } from "react";
import SystemsContext from "../../store/systems-context";

import classes from "./MobileNavigation.module.css";

const MobileNavigation = (props) => {
  const ctx = useContext(SystemsContext);

  const changeActivePageHandler = (event) => {
    props.onChangeActivePage(event.target.id);
  }

  return (
    <nav className={classes.nivigation}>
      <ul>
        <li className={props.activePage === "1" ? classes.active : ""}>
          <button id="1" onClick={changeActivePageHandler}>
            Входни параметри
            <div className={classes["data-bar"]}>
              <div className={classes[ctx.selectedInputCS]}></div>
              <div className={classes[ctx.selectedInputHS]}></div>
            </div>
          </button>
        </li>
        <li className={props.activePage === "2" ? classes.active : ""}>
          <button id="2" onClick={changeActivePageHandler}>
            Изходни параметри
            <div className={classes["data-bar"]}>
              <div className={classes[ctx.selectedOutputCS]}></div>
              <div className={classes[ctx.selectedOutputHS]}></div>
            </div>
          </button>
        </li>
        <li className={props.activePage === "3" ? classes.active : ""}>
          <button id="3" onClick={changeActivePageHandler}>
            Входни координати
            <div className={classes["data-bar"]}>
              <div className={classes[ctx.selectedInputCS]}></div>
              <div className={classes[ctx.selectedInputHS]}></div>
            </div>
          </button>
        </li>
        <li className={props.activePage === "4" ? classes.active : ""}>
          <button id="4" onClick={changeActivePageHandler}>
            Изходни координати
            <div className={classes["data-bar"]}>
              <div className={classes[ctx.selectedOutputCS]}></div>
              <div className={classes[ctx.selectedOutputHS]}></div>
            </div>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavigation;
