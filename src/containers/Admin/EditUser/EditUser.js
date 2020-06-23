import React, { Fragment } from "react";

import Toolbar from "../../../components/Navigation/Toolbar/Toolbar";

const EditUser = (props) => {
  const adminFeature = props.history.location.pathname.split("/").pop();
  return (
    <Fragment>
      <Toolbar adminFeature={adminFeature} toolbarType="adminToolbar" />
      <div>the admin panel to edit user info will be here</div>
    </Fragment>
  );
};

export default EditUser;
