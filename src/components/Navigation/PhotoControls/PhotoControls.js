import React from "react";

import classes from "./PhotoControls.module.css";
import Button from "../../UI/Button/Button";

const photoControls = ({
  currentColor,
  switchButtonClicked,
  isSwitchButtonDisabled,
}) => {
  const buttonTypes = ["previous", "next"];

  return (
    <div className={classes.PhotoControls}>
      {buttonTypes.map((btnType) => (
        <Button
          key={btnType}
          currentColor={currentColor}
          btnType={btnType}
          buttonClicked={switchButtonClicked}
          isButtonDisabled={isSwitchButtonDisabled[btnType]}
        ></Button>
      ))}
    </div>
  );
};

export default photoControls;
