import React from "react";

import classes from "./Button.module.css";

import { COLOR_HEXACODES } from "../../../shared/constants";

const button = ({ children, currentColor, btnType, buttonClicked, isButtonDisabled }) => {

  return (
    <button
      style={{ backgroundColor: COLOR_HEXACODES[currentColor] }}
      className={[classes.Button, classes[btnType]].join(" ")}
      onClick={() => buttonClicked(btnType)}
      disabled={isButtonDisabled}
    >
      {children}
    </button>
  );
};

export default button;
