import React from "react";

import classes from "./PhotoControls.module.css";
import Button from "../../UI/Button/Button";

const photoControls = ({ currentColor, buttonClicked, isButtonDisabled }) => {
  const buttonTypes = ["next", "previous"];

  return (
    <div className={classes.PhotoControls}>
      {buttonTypes.map((btnType) => (
        <Button
          key={btnType}
          currentColor={currentColor}
          btnType={btnType}
          buttonClicked={buttonClicked}
          isButtonDisabled={isButtonDisabled}
        ></Button>
      ))}
    </div>
  );
};

export default photoControls;
