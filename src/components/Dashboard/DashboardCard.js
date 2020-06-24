import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Conditionally render different images based on whether or not the particular user
// has completed flashcards, exercises, or quiz. JSX is prepared BEFORE the return/render

const DashboardCard = (props) => {
  const purl = process.env.PUBLIC_URL;
  const alphabet = 5; // num levels pertaining to alphabet
  const d = props.levelData;
  let flashcard;
  let exercise;
  let quiz;

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

  // we use this function to check if all tasks on the previous level
  // are completed. That's how we know when to make the next level accessible.
  // we created the "levelMinusOne" variable to reference the previous level
  // so we don't have to repeatedly call findWithAttr over and over.
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

  // LOGIC FOR FLASHCARD BUBBLES
  if (d.level_id === 1) {
    if (d.completed_flashcards === null) {
      flashcard = (
        <>
          <Link to={`/flashcard/${d.level_id}`}>
            <img
              src={purl + "/images/icons/flashCardColor.png"}
              alt={`flashcards for level ${d.level_id}`}
            />
          </Link>
          <p>A - E</p>
        </>
      );
    } else if (d.completed_flashcards) {
      flashcard = (
        <>
          <Link to={`/flashcard/${d.level_id}`}>
            <img
              src={purl + "/images/icons/flashCardChecked.png"}
              alt={`flashcards for level ${d.level_id}`}
            />
          </Link>
          <p>A - E</p>
        </>
      );
    }
  } else {
    if (
      props.userLevels[levelMinusOne].completed_exercises &&
      props.userLevels[levelMinusOne].completed_flashcards &&
      props.userLevels[levelMinusOne].completed_quiz &&
      d.completed_flashcards === null
    ) {
      flashcard = (
        <>
          <Link to={`/flashcard/${d.level_id}`}>
            <img
              src={purl + "/images/icons/flashCardColor.png"}
              alt={`flashcards for level ${d.level_id}`}
            />
          </Link>
          {alphabetFlashTitle}
        </>
      );
    } else if (d.completed_flashcards) {
      flashcard = (
        <>
          <Link to={`/flashcard/${d.level_id}`}>
            <img
              src={purl + "/images/icons/flashCardChecked.png"}
              alt={`flashcards for level ${d.level_id}`}
            />
          </Link>
          {alphabetFlashTitle}
        </>
      );
    } else {
      flashcard = (
        <>
          <img
            src={purl + "/images/icons/flashCardBW.png"}
            alt={`flashcards for level ${d.level_id}`}
          />
          {alphabetFlashTitle}
        </>
      );
    }
  }
  // LOGIC FOR EXERCISE BUBBLES
  if (d.completed_flashcards && d.completed_exercises === null) {
    exercise = (
      <>
        <Link to={`/exercise/${d.level_id}`}>
          <img
            src={purl + "/images/icons/exerciseColor.png"}
            alt={`exercises for level ${d.level_id}`}
          />
        </Link>
        <p>Exercises</p>
      </>
    );
  } else if (d.completed_flashcards && d.completed_exercises) {
    exercise = (
      <>
        <Link to={`/exercise/${d.level_id}`}>
          <img
            src={purl + "/images/icons/exerciseChecked.png"}
            alt={`exercises for level ${d.level_id}`}
          />
        </Link>
        <p>Exercises</p>
      </>
    );
  } else if (d.level_id === 1) {
    exercise = (
      <>
        <img
          src={purl + "/images/icons/exerciseFaded.png"}
          alt={`exercises for level ${d.level_id}`}
        />
        <p>Exercises</p>
      </>
    );
  } else {
    exercise = (
      <>
        <img
          src={purl + "/images/icons/exerciseBW.png"}
          alt={`exercises for level ${d.level_id}`}
        />
        <p>Exercises</p>
      </>
    );
  }
  // LOGIC FOR QUIZ BUBBLES
  if (d.completed_exercises && d.completed_quiz === null) {
    quiz = (
      <>
        <Link to={`/quiz/${d.level_id}`}>
          <img
            src={purl + "/images/icons/quizColor.png"}
            alt={`quiz for level ${d.level_id}`}
          />
        </Link>
        <p>Quiz</p>
      </>
    );
  } else if (d.completed_quiz && d.completed_exercises) {
    quiz = (
      <>
        <Link to={`/quiz/${d.level_id}`}>
          <img
            src={purl + "/images/icons/quizChecked.png"}
            alt={`quiz for level ${d.level_id}`}
          />
        </Link>
        <p>Quiz</p>
      </>
    );
  } else if (d.level_id === 1) {
    quiz = (
      <>
        <img
          src={purl + "/images/icons/quizFaded.png"}
          alt={`quiz for level ${d.level_id}`}
        />
        <p>Quiz</p>
      </>
    );
  } else {
    quiz = (
      <>
        <img
          src={purl + "/images/icons/quizBW.png"}
          alt={`quiz for level ${d.level_id}`}
        />
        <p>Quiz</p>
      </>
    );
  }

  return (
    <div id="dash" className="dashboard">
      {props.title <= alphabet ? <h1>Alphabet - Level {props.title}</h1> : null}
      {d.level_id === 1 ||
      (props.userLevels[levelMinusOne].completed_exercises &&
        props.userLevels[levelMinusOne].completed_flashcards &&
        props.userLevels[levelMinusOne].completed_quiz) ? (
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
      ) : (
        <div className="progress-bar">
          <img
            className="progress-bar-img"
            src={purl + "/images/icons/progressBarBW.png"}
            alt="A progress Bar"
          />
          <img
            className="crown-img"
            src={purl + "/images/icons/crownBW.png"}
            alt="A completion crown"
          />
        </div>
      )}

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
