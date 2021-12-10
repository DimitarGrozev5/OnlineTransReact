import React from "react";

import classes from "./WidgetContainer.module.css";

const WidgetContainer = props => {
  return <section className={classes["widget-container"]}>{props.children}</section>;
}

export default WidgetContainer;