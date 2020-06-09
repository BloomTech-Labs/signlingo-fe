import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const DashboardCard = (props) => {
  const history = useHistory();
  const purl = process.env.PUBLIC_URL;
  const alphabet = 5;
  const d = props.levelData;
  let flashcard;
  let exercise;
  let quiz;

  function findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  let levelMinusOne = findWithAttr(
    props.userLevels,
    "level_id",
    d.level_id - 1
  );

  if (d.level_id === 1) {
    if (d.completed_flashcards === null) {
      flashcard = (
        <>
          <img src={purl + "/images/icons/flashCardColor.png"}></img>
          <p>Flashcards</p>
        </>
      );
    } else if (d.completed_flashcards) {
      flashcard = (
        <>
          <img src={purl + "/images/icons/flashCardChecked.png"}></img>
          <p>Flashcards</p>
        </>
      );
    }
  } else {
    if (
      props.userLevels[levelMinusOne].completed_exercises &&
      props.userLevels[levelMinusOne].completed_flashcards &&
      props.userLevels[levelMinusOne].completed_quiz
    ) {
      flashcard = (
        <>
          <img src={purl + "/images/icons/flashCardColor.png"}></img>
          <p>Flashcard</p>
        </>
      );
    } else if (d.completed_flashcards) {
      flashcard = (
        <>
          <img src={purl + "/images/icons/flashCardChecked.png"}></img>
          <p>Flashcard</p>
        </>
      );
    } else {
      flashcard = (
        <>
          <img src={purl + "/images/icons/flashCardFaded.png"}></img>
          <p>Flashcard</p>
        </>
      );
    }
  }

  if (d.completed_flashcards !== null && d.completed_exercises === null) {
    exercise = (
      <>
        <img src={purl + "/images/icons/exerciseColor.png"}></img>
        <p>Exercises</p>
      </>
    );
  } else if (d.completed_flashcards && d.completed_exercises) {
    exercise = (
      <>
        <img src={purl + "/images/icons/exerciseChecked.png"}></img>
        <p>Exercises</p>
      </>
    );
  } else {
    exercise = (
      <>
        <img src={purl + "/images/icons/exerciseFaded.png"}></img>
        <p>Exercises</p>
      </>
    );
  }

  if (d.completed_quiz === null && d.completed_exercises) {
    quiz = (
      <>
        <img src={purl + "/images/icons/quizColor.png"}></img>
        <p>Video Quiz</p>
      </>
    );
  } else if (d.completed_quiz && d.completed_exercises) {
    quiz = (
      <>
        <img src={purl + "/images/icons/quizChecked.png"}></img>
        <p>Video Quiz</p>
      </>
    );
  } else {
    quiz = (
      <>
        <img src={purl + "/images/icons/quizFaded.png"}></img>
        <p>Video Quiz</p>
      </>
    );
  }

  return (
    <div className="dashboard">
      {props.title <= alphabet ? <h1>Alphabet - Level {props.title}</h1> : null}
      <div className="progress-bar">
        <img
          className="progress-bar-img"
          src={purl + "/images/icons/progressBarColor.png"}
          alt="A progress Bar"
        />
        <img
          className="crown-img"
          src={purl + "/images/icons/crownColor.png"}
          alt="A completion crown"
        />
      </div>
      <section className="dashboard-content">
        <div id="flashcard-box">{flashcard}</div>
        <div className="exercise-quiz-wrapper">
          <div id="exercise-box">{exercise}</div>
          <div id="quiz-box">{quiz}</div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userLevels: state.levelsReducer.userLevels, // level_id, user_id, ACTIVE OR NOT values
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCard);
