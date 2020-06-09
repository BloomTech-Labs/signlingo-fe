import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import LandingPage from "./components/LandingPage";
import Account from "./components/Account";
import QuizLandingPage from "./components/Quiz/QuizLandingPage.js";
import Quiz from "./components/Quiz/Quiz";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/account/signup">
          <Account value={0} /> {/*value displays correct tab preventing memory leak*/}
        </Route>
        <Route exact path="/account/login">
          <Account value={1} /> {/*value displays correct tab preventing memory leak*/}
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
