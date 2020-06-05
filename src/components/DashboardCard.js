import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { grabLesson } from "../actions/lessonActions";

// import crownSm from "/images/icons/progressCrownIcon.png";
// import practiceSm from "/images/icons/practiceSm.png";
// import lessonSm from "/images/icons/lessonSm.png";
// import quizSm from "/images/icons/quizSm.png";
// import progressBarSm from "/images/icons/progressBarIconBW.png";

// import crownSmBw from "/images/icons/progressCrownIconBW.png";
// import practiceSmBw from "/images/icons/practiceSmallBW.png";
// import lessonSmBw from "/images/icons/lessonSmallBW.png";
// import quizSmBw from "/images/icons/quizSmallBW.png";
// import progressBarSmBw from "/images/icons/progressBarIconBW.png";

// import practiceSmCh from "/images/icons/practiceSmallCH.png";
// import lessonSmCh from "/images/icons/lessonSmallCH.png";
// import quizSmCh from "/images/icons/quizSmallCH.png";

const DashboardCard = (props) => {
  const history = useHistory();
  const purl = process.env.PUBLIC_URL;
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
            <img src={purl + '/images/icons/progressBarIconBW.png'} alt="A progress Bar" />
            <img src={purl + '/images/icons/progressCrownIcon.png'} alt="A completion crown" />
          </div>

          <section className="dashboardContent">
            <div onClick={lessonHandler}>
              {/* ternary in src renders either icon with check or without*/}
              <img
                src={props.data.Lesson ? purl + '/images/icons/lessonSmallCH.png' : purl + '/images/icons/lessonSm.png'}
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
                  src={props.data.Practice ? purl + '/images/icons/practiceSmallCH.png' : purl + '/images/icons/practiceSm.png'}
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
                  src={props.data.Quiz ? purl + '/images/icons/quizSmallCH.png' : purl + '/images/icons/quizSm.png'}
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
            <img src={purl + '/images/icons/progressBarIconBW.png'} alt="progress bar black and white" />
            <img src={purl + '/images/icons/progressCrownIconBW.png'} alt="A completion crown" />
          </div>

          <section className="dashboardContent">
            <div onClick={lessonHandler}>
              <img src={purl + '/images/icons/lessonSmallBW.png'} alt="A lessons icon" />
              <p>{props.data.signs}</p>
            </div>

            <div className="dashboardBttm">
              <div id="practiceBox" onClick={practiceHandler}>
                <img src={purl + '/images/icons/practiceSmallBW.png'} alt="A practice icon" />
                <p>Practice</p>
              </div>
              <div id="quizBox" onClick={quizHandler}>
                <img src={purl + '/images/icons/quizSmallBW.png'} alt="A quiz icon" />
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
