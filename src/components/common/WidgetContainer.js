import React from "react";

import classes from "./WidgetContainer.module.css";

const WidgetContainer = (props) => {
  return (
    <div
      className={`${classes["widget-container"]} ${
        props.expand ? classes.expand : ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default WidgetContainer;
