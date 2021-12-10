import React from "react";

import classes from "./MobileNavigation.module.css";

const MobileNavigation = (props) => {
  return <nav className={classes.nivigation}>
    <ul>
      <li className="active">Входни параметри</li>
      <li>Изходни параметри</li>
      <li>Входни координати</li>
      <li>Изходни координати</li>
    </ul>
  </nav>;
};

export default MobileNavigation;
