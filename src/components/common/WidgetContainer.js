import React from "react";

import classes from "./WidgetContainer.module.css";

const WidgetContainer = (props) => {
  return (
    <fieldset
      className={`${classes["widget-container"]} ${
        props.expand ? classes.expand : ""
      }`}
    >
      <legend>{props.title}</legend>
      {props.children}
    </fieldset>
  );
};

export default WidgetContainer;
