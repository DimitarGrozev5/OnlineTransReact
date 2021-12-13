import React, { useContext } from "react";
import SystemsContext from "../../store/systems-context";

import classes from "./MobileNavigation.module.css";

const MobileNavigation = (props) => {
  const ctx = useContext(SystemsContext);

  const changeActivePageHandler = (event) => {
    props.onChangeActivePage(event.target.dataset.id);
  }

  return (
    <nav className={classes.nivigation}>
      <ul>
        <li className={props.activePage === "1" ? classes.active : ""}>
          <button data-id="1" onClick={changeActivePageHandler}>
            Входни параметри
            <div data-id="1" className={classes["data-bar"]}>
              <div data-id="1" className={classes[ctx.selectedInputCS]}></div>
              <div data-id="1" className={classes[ctx.selectedInputHS]}></div>
            </div>
          </button>
        </li>
        <li className={props.activePage === "2" ? classes.active : ""}>
          <button data-id="2" onClick={changeActivePageHandler}>
            Изходни параметри
            <div data-id="2" className={classes["data-bar"]}>
              <div data-id="2" className={classes[ctx.selectedOutputCS]}></div>
              <div data-id="2" className={classes[ctx.selectedOutputHS]}></div>
            </div>
          </button>
        </li>
        <li className={props.activePage === "3" ? classes.active : ""}>
          <button data-id="3"  onClick={changeActivePageHandler}>
            Входни координати
            <div data-id="3" className={classes["data-bar"]}>
              <div data-id="3" className={classes[ctx.selectedInputCS]}></div>
              <div data-id="3" className={classes[ctx.selectedInputHS]}></div>
            </div>
          </button>
        </li>
        <li className={props.activePage === "4" ? classes.active : ""}>
          <button data-id="4" onClick={changeActivePageHandler}>
            Изходни координати
            <div data-id="4"  className={classes["data-bar"]}>
              <div data-id="4"  className={classes[ctx.selectedOutputCS]}></div>
              <div data-id="4"  className={classes[ctx.selectedOutputHS]}></div>
            </div>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavigation;
