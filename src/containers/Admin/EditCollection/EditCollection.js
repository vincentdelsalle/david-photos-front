import React, { Fragment } from "react";

import Toolbar from "../../../components/Navigation/Toolbar/Toolbar";

const EditCollection = (props) => {
  const adminFeature = props.history.location.pathname.split("/").pop();
  return (
    <Fragment>
      <Toolbar adminFeature={adminFeature} toolbarType="adminToolbar" />
      <div>the admin panel to edit a collection will be here</div>
    </Fragment>
  );
};

export default EditCollection;
