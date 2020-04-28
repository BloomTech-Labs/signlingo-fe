import React from "react";
// import { Redirect } from 'react-router-dom';
import crownSm from "../images/icons/progress crown icon.png";
import practiceSm from "../images/icons/practiceSm.png";
import lessonSm from "../images/icons/lessonSm.png";
import quizSm from "../images/icons/quizSm.png";
import progressSm from "../images/icons/progress bar icon.png";

const DashboardCard = (props) => {
  function lessonHandler() {
    return;
  }

  function practiceHandler() {
    return;
  }

  function quizHandler() {
    return;
  }

  return (
    <div className="dashboard">
      <h1>Alphabet - Level {props.data.level}</h1>
      <div className="progressBar">
        <img src={progressSm} alt="progress bar" />
        <img src={crownSm} alt="A completion crown" />
      </div>

      <section className="dashboardContent">
        <div onClick={lessonHandler}>
          <img src={lessonSm} alt="A lessons icon" />
          <p>{props.data.lesson.text}</p>
        </div>

        <div className="dashboardBttm">
          <div id="practiceBox" onClick={practiceHandler}>
            <img src={practiceSm} alt="A practice icon" />
            <p>{props.data.practice.text}</p>
          </div>
          <div id="quizBox" onClick={quizHandler}>
            <img src={quizSm} alt="A quiz icon" />
            <p>{props.data.quiz.text}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardCard;
