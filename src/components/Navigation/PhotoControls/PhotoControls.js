import React from "react";

import classes from "./PhotoControls.module.css";
import Button from "../../UI/Button/Button";

import whiteArrow from "../../../assets/images/white-arrow.png";
import blackArrow from "../../../assets/images/black-arrow.png";

const photoControls = ({
  currentColor,
  switchButtonClicked,
  isSwitchButtonDisabled,
}) => {
  const buttonTypes = ["previous", "next"];
  const arrowImg =
    currentColor === "white" || currentColor === "blackwhite"
      ? blackArrow
      : whiteArrow;

  return (
    <div className={classes.PhotoControls}>
      {buttonTypes.map((btnType) => (
        <Button
          key={btnType}
          currentColor={currentColor}
          btnType={btnType}
          buttonClicked={switchButtonClicked}
          isButtonDisabled={isSwitchButtonDisabled[btnType]}
        ><img className={classes.Image} src={arrowImg} alt={`${btnType}`} /></Button>
      ))}
    </div>
  );
};

export default photoControls;
