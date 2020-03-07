import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Homepage from "./containers/Homepage/Homepage";
import Gallery from "./containers/Gallery/Gallery";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/gallery/:color" component={Gallery} />
          <Route path="/" exact component={Homepage} />
          <Route
            render={() => <h1 style={{ color: "#ffffff" }}>Not found.</h1>}
          />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
