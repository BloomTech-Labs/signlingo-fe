import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const DashboardCard = (props) => {
  const history = useHistory();
  const purl = process.env.PUBLIC_URL;
  const alphabet = 5;

  return (
    <>
      {props.title <= alphabet ? `Alphabet - Level ${props.title}` : null}
      {props.levelData.completed_flashcards === null &&
      props.levelData.completed_exercises === null &&
      props.levelData.completed_quiz === null ? (
        <>
          <img src={purl + "/images/icons/flashCardFaded.png"}></img>
          <img src={purl + "/images/icons/exerciseFaded.png"}></img>
          <img src={purl + "/images/icons/quizFaded.png"}></img>
        </>
      ) : (
        <>
          <p>display active levels accordingly</p>
          // for flashcard
          {props.levelData.completed_flashcards !== null ? (
            <img src={purl + "/images/icons/flashCardChecked.png"}></img>
          ) : (
            <>
              <img src={purl + "/images/icons/flashCardFaded.png"}></img>
              <img src={purl + "/images/icons/exerciseFaded.png"}></img>
              <img src={purl + "/images/icons/quizFaded.png"}></img>
            </>
          )}
          // for excercise
          {props.levelData.completed_exercises !== null ? (
            <img src={purl + "/images/icons/exerciseChecked.png"}></img>
          ) : (
            <p>exercise is null</p>
          )}
          // for quiz
          {props.levelData.completed_quiz !== null ? (
            <img src={purl + "/images/icons/flashCardChecked.png"}></img>
          ) : (
            <p>quiz is null</p>
          )}
        </>
      )}

      {/* <img src={purl + "/images/icons/progressBarColor.png"}></img>
    <img src={purl + "/images/icons/crownColor.png"}></img>

    <img src={purl + "/images/icons/flashCardColor.png"}></img>
    <img src={purl + "/images/icons/exerciseColor.png"}></img>
    <img src={purl + "/images/icons/quizColor.png"}></img>

    <img src={purl + "/images/icons/flashCardFaded.png"}></img>
    <img src={purl + "/images/icons/exerciseFaded.png"}></img>
    <img src={purl + "/images/icons/quizFaded.png"}></img>

    <img src={purl + "/images/icons/flashCardChecked.png"}></img>
    <img src={purl + "/images/icons/exerciseChecked.png"}></img>
    <img src={purl + "/images/icons/quizChecked.png"}></img> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userLevels: state.levelsReducer.userLevels, // level_id, user_id, ACTIVE OR NOT values
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCard);
