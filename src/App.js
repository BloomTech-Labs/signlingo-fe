import React from "react";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch, // this is different
} from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import config from "./components/Home/oktaConfig";
import LandingPage from "./components/Home/LandingPage";
import LoginAndRegister from "./components/Home/LoginAndRegister";
import Dashboard from "./components/Dashboard/Dashboard";
import QuizLandingPage from "./components/Quiz/QuizLandingPage";
import Quiz from "./components/Quiz/Quiz";

const HasAccessToRouter = () => {
  const history = useHistory(); // example from react-router

  const customAuthHandler = () => {
    // Redirect to the /login page that has a CustomLoginComponent
    history.push("/login");
  };

  return (
    <div className="App">
      <Security {...config.oidc} onAuthRequired={customAuthHandler}>
          <Route path="/" exact component={LandingPage} />
          <Route path="/implicit/callback" component={LoginCallback} />
          <Route path="/login" component={LoginAndRegister} />
          <SecureRoute path="/dashboard" component={Dashboard} />
          <SecureRoute path="/quizLanding" component={QuizLandingPage} />
          <SecureRoute exact path="/quiz" component={Quiz} />
      </Security>
    </div>
  );
};

function App() {
  return (
    <div>
      <Router>
        <HasAccessToRouter />
      </Router>
    </div>
  );
}

export default App;
