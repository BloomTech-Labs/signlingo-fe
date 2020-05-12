import React from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.scss";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import Account from "./components/Account";
import Lesson from "./components/Lesson";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
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
