import React from "react";
// import { Redirect } from 'react-router-dom';
import LinearProgress from "@material-ui/core/LinearProgress";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";

import crownSm from "../images/icons/progress crown icon.png";
import practiceSm from "../images/icons/practiceSm.png";
import lessonSm from "../images/icons/lessonSm.png";
import quizSm from "../images/icons/quizSm.png";
import progressSm from "../images/icons/progress bar icon.png";

const BorderLinearProgress = withStyles({
  root: {
    height:15,
    width: '100%',
    backgroundColor: lighten("#ff6c5c", 0.5),
    maxWidth: '100%'
   // margin: 0,
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "#ff6c5c",
   // margin: 0,

  },
})(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {
   // margin: theme.spacing(1),
    margin: 'auto'
  },
}));

const DashboardCard = (props) => {
  const classes = useStyles();
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
      <h1>Alphabet - Level {props.data.level.number}</h1>
      <div className="progressBar">
        <img src={progressSm} alt="progress bar" />
        <img src={crownSm} alt="A completion crown" />
      </div>
      <div className="progressBar">
        <div style={{ width: '90%'}}>
          <BorderLinearProgress
            className={classes.margin}
            variant="determinate"
            color="secondary"
            value={0}
          />
        </div>
        
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
