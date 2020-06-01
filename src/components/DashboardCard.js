import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { grabLesson } from "../actions/grabLesson";
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
    if (props.data.Active) {
      props.grabLesson(props.data);
      history.push("/lesson");
    }
  }

  function practiceHandler() {
    //if statement checks if user has access to entire lesson, and if they completed lesson/practice/quiz before
    if (props.data.Active && props.data.Lesson) {
      // return redirect to practice component, which doesn't exist yet
    }
  }

  function quizHandler() {
    if (props.data.Active && props.data.Practice) {
      // return redirect to quiz component, which doesn't exist yet
    }
  }

  return (
    <>
      {/*Ternary looks at whether or not the level object is active. If yes, the user can interact with lesson/practice/quiz divs. 
    If no, the content is black and white and inaccessible */}
      {props.data.Active ? (
        <div className="dashboard">
          <h1>Alphabet - Level {props.data.Level}</h1>
          <div className="progressBar">
            <img src={progressBarSm} alt="A progress Bar" />
            <img src={crownSm} alt="A completion crown" />
          </div>

          <section className="dashboardContent">
            <div onClick={lessonHandler}>
              {/* ternary in src renders either icon with check or without*/}
              <img
                src={props.data.Lesson ? lessonSmCh : lessonSm}
                alt="A lessons icon"
              />
              <p>{props.data.signs}</p>
            </div>
            {/*dashboardBttm exists for styling reasons. dashboardTop is not needed */}
            <div className="dashboardBttm">
              <div
                id="practiceBox"
                onClick={practiceHandler}
                className={props.data.Lesson ? null : "locked"}
              >
                <img
                  src={props.data.Practice ? practiceSmCh : practiceSm}
                  alt="A practice icon"
                />
                <p>Practice</p>
              </div>

              <div
                id="quizBox"
                onClick={quizHandler}
                className={props.data.Practice ? null : "locked"}
              >
                <img
                  src={props.data.Quiz ? quizSmCh : quizSm}
                  alt="A quiz icon"
                />
                <p>Quiz</p>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="dashboardBw">
          <h1>Alphabet - Level {props.data.Level}</h1>
          <div className="progressBar">
            <img src={progressBarSmBw} alt="progress bar black and white" />
            <img src={crownSmBw} alt="A completion crown" />
          </div>

          <section className="dashboardContent">
            <div onClick={lessonHandler}>
              <img src={lessonSmBw} alt="A lessons icon" />
              <p>{props.data.signs}</p>
            </div>

            <div className="dashboardBttm">
              <div id="practiceBox" onClick={practiceHandler}>
                <img src={practiceSmBw} alt="A practice icon" />
                <p>Practice</p>
              </div>
              <div id="quizBox" onClick={quizHandler}>
                <img src={quizSmBw} alt="A quiz icon" />
                <p>Quiz</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default connect(null, { grabLesson })(DashboardCard);
