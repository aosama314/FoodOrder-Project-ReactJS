import React from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const input = props.input;

  return (
    <div className={classes.input}>
      <label htmlFor={input.id}>{props.label}</label>
      <input ref={ref} {...input} />
    </div>
  );
});

export default Input;
