import React from "react";
import {Router, Route} from "react-router";
import history from "./history.js";

import App from "./app.jsx";
import Frontpage from "./pages/frontpage.jsx";

const routes = (
    <Router history={history}>
      <App>
        <Route exact path="/" component={Frontpage}/>
      </App>
    </Router>
);

export default routes;
