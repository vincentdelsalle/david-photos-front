import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Homepage from "./containers/Homepage/Homepage";
import Collection from "./containers/Collection/Collection";
import Photo from "./containers/Photo/Photo";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/gallery/:color/:id" exact component={Photo} />
          <Route path="/gallery/:color" exact component={Collection} />
          <Route path="/" exact component={Homepage} />
          <Route render={() => <h1>Not found.</h1>} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
