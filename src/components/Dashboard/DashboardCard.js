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
  let level = document.getElementById("dash");

  let alphabetFlashTitle =
    props.levelData.level_id === 2 ? (
      <p>F - J</p>
    ) : props.levelData.level_id === 3 ? (
      <p>K - O</p>
    ) : props.levelData.level_id === 4 ? (
      <p>P - T</p>
    ) : props.levelData.level_id === 5 ? (
      <p>U - Z</p>
    ) : (
      "Add Future Level Name Here"
    ); // add more levels here if necessary

  const onFlashCard = () => {
    history.push("/flashcard");
  };

  const onExercise = () => {
    history.push("/exercise");
  };

  const onQuiz = () => {
    history.push("/quizlanding");
  };

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
          <img
            onClick={onFlashCard}
            src={purl + "/images/icons/flashCardColor.png"}
          ></img>
          <p>A - E</p>
        </>
      );
    } else if (d.completed_flashcards) {
      flashcard = (
        <>
          <img
            onClick={onFlashCard}
            src={purl + "/images/icons/flashCardChecked.png"}
          ></img>
          <p>A - E</p>
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
          <img
            onClick={onFlashCard}
            src={purl + "/images/icons/flashCardColor.png"}
          ></img>
          {alphabetFlashTitle}
        </>
      );
    } else if (d.completed_flashcards) {
      flashcard = (
        <>
          <img
            onClick={onFlashCard}
            src={purl + "/images/icons/flashCardChecked.png"}
          ></img>
          {alphabetFlashTitle}
        </>
      );
    } else {
      flashcard = (
        <>
          <img src={purl + "/images/icons/flashCardBW.png"}></img>
          {alphabetFlashTitle}
        </>
      );
    }
  }

  if (d.completed_flashcards !== null && d.completed_exercises === null) {
    exercise = (
      <>
        <img
          onClick={onExercise}
          src={purl + "/images/icons/exerciseColor.png"}
        ></img>
        <p>Exercises</p>
      </>
    );
  } else if (d.completed_flashcards && d.completed_exercises) {
    exercise = (
      <>
        <img
          onClick={onExercise}
          src={purl + "/images/icons/exerciseChecked.png"}
        ></img>
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
        <img onClick={onQuiz} src={purl + "/images/icons/quizColor.png"}></img>
        <p>Video Quiz</p>
      </>
    );
  } else if (d.completed_quiz && d.completed_exercises) {
    quiz = (
      <>
        <img
          onClick={onQuiz}
          src={purl + "/images/icons/quizChecked.png"}
        ></img>
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
  // working on greyout levels 
  // if (
  //   d.completed_exercises === null &&
  //   d.completed_flashcards === null &&
  //   d.completed_quiz === null &&
  //   level &&
  //   d.level_id !== 1
  // ) {
  //   level.classList.add("dashboard-greyout")
  // }

  return (
    <div id="dash" className="dashboard">
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
