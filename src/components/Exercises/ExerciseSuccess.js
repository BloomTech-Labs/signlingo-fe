import React from "react";
import { useHistory } from "react-router-dom";

export default function ExerciseSuccess() {
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
      <h1 className="signLabel">{`Success! Good Job!`}</h1>
      <div className="resultsPage">
        <img
          className="quizSuccess"
          src={process.env.PUBLIC_URL + "/images/quiz/success.png"}
          alt="successful quiz attempt"
        />{" "}
        <button onClick={backToDash} className="finishButton">
          Finish
        </button>
      </div>
    </div>
  );
}
