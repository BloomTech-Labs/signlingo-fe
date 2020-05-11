import React from "react";
import { useHistory } from "react-router-dom";
import crownSm from "../images/icons/progress crown icon.png";
import practiceSm from "../images/icons/practiceSm.png";
import lessonSm from "../images/icons/lessonSm.png";
import quizSm from "../images/icons/quizSm.png";
import progressBarSm from "../images/icons/progress bar icon.png";

import crownSmBw from "../images/icons/progress crown icon BW.png";
import practiceSmBw from "../images/icons/practiceSm BW.png";
import lessonSmBw from "../images/icons/lessonSm BW.png";
import quizSmBw from "../images/icons/quizSm BW.png";
import progressBarSmBw from "../images/icons/progress bar icon BW.png";

import practiceSmCh from "../images/icons/practiceSm CH.png";
import lessonSmCh from "../images/icons/lessonSm CH.png";
import quizSmCh from "../images/icons/quizSm CH.png";

const DashboardCard = (props) => {
  const history = useHistory();

  // handlers check if user has access to that feature, then redirects to the relevant component
  function lessonHandler() {
    if (props.data.level.active) {
      return history.push("/lesson");
    }
  }

  function practiceHandler() {
    if (props.data.level.active && props.data.lesson.completed) {
      // return redirect to route
    }
  }

  function quizHandler() {
    if (props.data.level.active && props.data.practice.completed) {
      // return redirect to route
    }
  }

  return (
    <>
      {/*Ternary looks at whether or not the level object is active. If yes, the user can interact with lesson/practice/quiz divs. 
    If no, the content is black and white and inaccessible */}
      {props.data.level.active ? (
        <div className="dashboard">
          <h1>Alphabet - Level {props.data.level.number}</h1>
          <div className="progressBar">
            <img src={progressBarSm} alt="A progress Bar" />
            <img src={crownSm} alt="A completion crown" />
          </div>

          <section className="dashboardContent">
            <div onClick={lessonHandler}>
              <img
                src={props.data.lesson.completed ? lessonSmCh : lessonSm}
                alt="A lessons icon"
              />
              <p>{props.data.lesson.text}</p>
            </div>
            <div className="dashboardBttm">
              <div
                id="practiceBox"
                onClick={practiceHandler}
                className={props.data.lesson.completed ? null : "locked"}
              >
                <img
                  src={
                    props.data.practice.completed ? practiceSmCh : practiceSm
                  }
                  alt="A practice icon"
                />
                <p>{props.data.practice.text}</p>
              </div>

              <div
                id="quizBox"
                onClick={quizHandler}
                className={props.data.practice.completed ? null : "locked"}
              >
                <img
                  src={props.data.quiz.completed ? quizSmCh : quizSm}
                  alt="A quiz icon"
                />
                <p>{props.data.quiz.text}</p>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="dashboardBw">
          <h1>Alphabet - Level {props.data.level.number}</h1>
          <div className="progressBar">
            <img src={progressBarSmBw} alt="progress bar black and white" />
            <img src={crownSmBw} alt="A completion crown" />
          </div>

          <section className="dashboardContent">
            <div onClick={lessonHandler}>
              <img src={lessonSmBw} alt="A lessons icon" />
              <p>{props.data.lesson.text}</p>
            </div>

            <div className="dashboardBttm">
              <div id="practiceBox" onClick={practiceHandler}>
                <img src={practiceSmBw} alt="A practice icon" />
                <p>{props.data.practice.text}</p>
              </div>
              <div id="quizBox" onClick={quizHandler}>
                <img src={quizSmBw} alt="A quiz icon" />
                <p>{props.data.quiz.text}</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default DashboardCard;
