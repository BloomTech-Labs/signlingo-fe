import React from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import "./App.scss";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import Account from "./components/Account";
import Lesson from "./components/Lesson";
import DashboardCard from "./components/DashboardCard";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route exact path="/lesson">
          <Lesson />
        </Route>
        <Route exact path="/account">
          <Account />
        </Route>
      </Router>
    </div>
  );
}

export default App;
