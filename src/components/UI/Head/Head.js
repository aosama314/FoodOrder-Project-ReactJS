import React from "react";

import Button from "../Button/Button";
import classes from "./Head.module.css";

const Head = (props) => {
  return (
    <header className={classes.header}>
      <h1>{props.headerLabel}</h1>
      <Button />
    </header>
  );
};

export default Head;
