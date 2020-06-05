import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import Account from "./components/Account";
import Lesson from "./components/Lesson";
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
          {/* passing a value so the proper tab is displayed 
            without this it causes a memory leak */}
          <Account value={0} />
        </Route>
        <Route exact path="/account/login">
          {/* passing a value so the proper tab is displayed 
            without this it causes a memory leak */}
          <Account value={1} />
        </Route>
        <PrivateRoute>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/lesson">
            <Lesson />
          </Route>
          <Route path="/quizLanding">
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
