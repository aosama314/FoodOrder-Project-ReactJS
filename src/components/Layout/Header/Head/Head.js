import React from "react";
import CartButton from "../../../Cart/CartButton/CartButton";

import classes from "./Head.module.css";

const Head = (props) => {
  return (
    <header className={classes.header}>
      <h1>{props.headerLabel}</h1>
      <CartButton onClick={props.onClick} />
    </header>
  );
};

export default Head;
