import React from "react";

import classes from "./Button.module.css";

import { COLOR_HEXACODES } from "../../../utils/constants";
import whiteArrow from "../../../assets/images/white-arrow.png";
import blackArrow from "../../../assets/images/black-arrow.png";

const button = ({ currentColor, btnType, buttonClicked, isButtonDisabled }) => {
  const arrowImg =
    currentColor === "white" || currentColor === "blackwhite"
      ? blackArrow
      : whiteArrow;

  return (
    <button
      style={{ backgroundColor: COLOR_HEXACODES[currentColor] }}
      className={[classes.Button, classes[btnType]].join(" ")}
      onClick={() => buttonClicked(btnType)}
      disabled={isButtonDisabled}
    >
      <img className={classes.Image} src={arrowImg} alt={`${btnType}`} />
    </button>
  );
};

export default button;
