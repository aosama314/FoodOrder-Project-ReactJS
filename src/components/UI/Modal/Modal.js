import React, { Fragment } from "react";
import ReactDom from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCloseCart}></div>;
};

const Overlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const portalElementRoot = document.getElementById("overlays");

  return (
    <Fragment>
      {ReactDom.createPortal(
        <Backdrop onCloseCart={props.onCloseCart} />,
        portalElementRoot
      )}
      {ReactDom.createPortal(
        <Overlay>{props.children}</Overlay>,
        portalElementRoot
      )}
    </Fragment>
  );
};

export default Modal;
