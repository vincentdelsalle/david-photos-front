import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import Homepage from "./containers/Homepage/Homepage";
import Collection from "./containers/Collection/Collection";
import Photo from "./containers/Photo/Photo";
import Logout from "./containers/Auth/Logout/Logout";
import Auth from "./containers/Auth/Auth";
import UploadPhoto from "./containers/Admin/UploadPhoto/UploadPhoto";
import EditCollection from "./containers/Admin/EditCollection/EditCollection";
import EditUser from "./containers/Admin/EditUser/EditUser";
import * as actions from "./store/actions/index";

const App = ({ onTryAutoSignup, isAuthenticated }) => {
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/gallery/:color/:id" exact component={Photo} />
      <Route path="/gallery/:color" exact component={Collection} />
      <Route path="/auth" exact component={Auth} />
      <Route path="/" exact component={Homepage} />
      <Redirect to="/" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/gallery/:color/:id" exact component={Photo} />
        <Route path="/gallery/:color" exact component={Collection} />
        <Route path="/admin/uploadphoto" exact component={UploadPhoto} />
        <Route path="/admin/editcollection" exact component={EditCollection} />
        <Route path="/admin/edituser" exact component={EditUser} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/" exact component={Homepage} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
