import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const QuizLandingPage = (props) => {
  let history = useHistory();

  const handleQuizSubmit = () => {
    history.push(`/quiz`);
  };

  const backToDash = () => {
    return history.push("/dashboard");
  }

  return (
    <>
      <div className="quizDemo">
        <div className="quizDemoHead">
          <img
            onClick={backToDash}
            className="closing"
            src= {process.env.PUBLIC_URL + "/images/quiz/exitBlackX.png"}
            alt="exit image"
          />
          <p>Quiz</p>
        </div>
        <h1 className="demoLabel">
          Take a quick quiz to see how well you've learned
        </h1>
        <img
          className="quizDemoImage"
          src= {process.env.PUBLIC_URL + "/images/quiz/quizModel.png"}
          alt="how to take quiz example"
        />
        <p className="demoMessage">Sign for the camera, get results!</p>
        <button onClick={handleQuizSubmit} className="demoButton">
          Got it!
        </button>
      </div>
    </>
  );
};

export default QuizLandingPage;
