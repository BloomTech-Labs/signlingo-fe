import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import LandingPage from "./components/LandingPage";
import Account from "./components/Account";
import QuizLandingPage from "./components/Quiz/QuizLandingPage.js";
import Quiz from "./components/Quiz/Quiz";
import Okta from "./components/OktaSignInWidget.js";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/auth">
          <Okta/>
        </Route>
        <PrivateRoute>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/quizlanding">
            <QuizLandingPage />
          </Route>
          <Route path="/quiz">
            <Quiz />
          </Route>
        </PrivateRoute>
      </Router>
    </div>
  );
}

export default App;
