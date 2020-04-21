import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.scss";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import Account from "./components/Account";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/account">
          <Account />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
