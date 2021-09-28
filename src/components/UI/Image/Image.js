import React from "react";

import classes from "./Image.module.css";

const Image = (props) => {
  return (
    <div className={classes["main-image"]}>
      <img src={props.src} alt={props.alt} />
    </div>
  );
};

export default Image;
