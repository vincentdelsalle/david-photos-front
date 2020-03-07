import React from "react";

import classes from "./PhotoControls.module.css";
import Button from "../../UI/Button/Button";

const photoControls = props => {
  const { currentColor } = props;

  return (
    <div className={classes.PhotoControls}>
      <Button currentColor={currentColor} btnType="Previous"></Button>
      <Button currentColor={currentColor} btnType="Next"></Button>
    </div>
  );
};

export default photoControls;
