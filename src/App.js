import React from "react";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch
} from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import config from "./components/Home/00_oktaConfig";
import LandingPage from "./components/Home/LandingPage";
import LoginAndRegister from "./components/Home/LoginAndRegister";
import Dashboard from "./components/Dashboard/Dashboard";
import QuizWrapper from "./components/Quiz/QuizWrapper";
import Quiz from "./components/Quiz/Quiz";
import FlashCardWrapper from "./components/Flashcards/FlashcardWrapper";
import ExerciseWrapper from "./components/Exercises/ExerciseWrapper";
import ExerciseFail from "./components/Exercises/ExerciseFail"
import ExerciseSuccess from "./components/Exercises/ExerciseSuccess"
const HasAccessToRouter = () => {
  const history = useHistory(); // example from react-router

  const customAuthHandler = () => {
    // Redirect to the /login page that has a CustomLoginComponent
    history.push("/login");
  };

  return (
    <div className="App">
      <Security {...config.oidc} onAuthRequired={customAuthHandler}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/implicit/callback" component={LoginCallback} />
          <Route path="/login" component={LoginAndRegister} />
          <SecureRoute path="/dashboard" component={Dashboard} />
          <SecureRoute path="/flashcard/:id" component={FlashCardWrapper} />
          <SecureRoute path="/exercise/:id" component={ExerciseWrapper} />
          <SecureRoute path="/quiz/:id" component={QuizWrapper} />
          <SecureRoute path="/quizcard/:id" component={Quiz} />
          <SecureRoute path="/ExerciseSuccess/:id" component={ExerciseSuccess} />
          <SecureRoute path="/ExerciseFail" component={ExerciseFail} />
        </Switch>
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
