import React from "react";
import { useHistory } from "react-router-dom";

export default function ExerciseFail() {
  let history = useHistory();
  function backToDash() {
    return history.push("/dashboard");
  }

  return (
    <div className="quizDemo">
      <div className="quizDemoHead">
        <img
          onClick={backToDash}
          className="closing"
          src={process.env.PUBLIC_URL + "/images/quiz/exitBlackX.png"}
          alt="exit image"
        />
      </div>
      <h1 className="signLabel">{`You Failed! Sorry! Try Again!`}</h1>
      <div className="resultsPage">
        <img
          className="quizFailure"
          src={process.env.PUBLIC_URL + "/images/quiz/failure.png"}
          alt="failed quiz attempt"
        />{" "}
        <button onClick={backToDash} className="finishButton">
          Finish
        </button>
      </div>
    </div>
  );
}
