import React from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios'
const URL = process.env.REACT_APP_BACK_END_BASE_URL;

export default function ExerciseSuccess() {
  let history = useHistory();
  let { id } = useParams();

  function backToDash() {
    axios
      .put(`${URL}levels/exercise/${id}`, {
        oktaUID: localStorage.getItem("oktaUID"),
      })
      .then((res) => {
        console.log("successfully updated exercise bubble");
        return history.push("/dashboard");
      })
      .catch((err) => {
        console.log("error", err);
      });
    return history.push("/dashboard");
  }

  return (
    <div className="quizDemo">
      <div className="quizDemoHead">
        <img
          onClick={backToDash}
          className="closing"
          src={process.env.PUBLIC_URL + "/images/quiz/exitBlackX.png"}
          alt="exit"
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
