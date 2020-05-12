import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route exact path="/lesson">
            <Lesson />
          </Route>
          <Route exact path="/account/signup">
            {/* passing a value so the proper tab is displayed 
            without this it causes a memory leak */}
            <Account value={0} />
          </Route>
          <Route exact path="/account/login">
            {/* passing a value so the proper tab is displayed 
            without this it causes a memory leak */}
            <Account value={1} />
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
