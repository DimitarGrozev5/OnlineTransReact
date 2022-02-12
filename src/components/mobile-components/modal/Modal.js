import React, { useImperativeHandle, useState } from "react";
import ReactDom from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const Overlay = (props) => {
  return (
    <div className={classes.overlay}>
      {props.children}
    </div>
  );
};

const Modal = (props, ref) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDom.createPortal(
        <Overlay>{props.children}</Overlay>,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default React.forwardRef(Modal);
