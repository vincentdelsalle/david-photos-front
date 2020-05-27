import React, { Fragment } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'

const Admin = (props) => {
  return (
    <Fragment>
      <Toolbar
        toolbarType="adminToolbar"
      />
      <div>Admin panel will be here</div>
    </Fragment>)
}

export default Admin