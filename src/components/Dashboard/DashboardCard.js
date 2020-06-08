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
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}
  let levelMinusOne = findWithAttr(props.userLevels, "level_id", d.level_id - 1)
  if (d.level_id === 1) {
    if (d.completed_flashcards === null) {
      flashcard = <img src={purl + "/images/icons/flashCardColor.png"}></img>
    } else if (d.completed_flashcards) {
      flashcard = <img src={purl + "/images/icons/flashCardChecked.png"}></img>
    }
  }
  else {
    if (props.userLevels[levelMinusOne].completed_exercises && props.userLevels[levelMinusOne].completed_flashcards && props.userLevels[levelMinusOne].completed_quiz) {
      flashcard = <img src={purl + "/images/icons/flashCardColor.png"}></img>
    } else if (d.completed_flashcards) {
      flashcard = <img src={purl + "/images/icons/flashCardChecked.png"}></img>
    }
    else {
      flashcard = <img src={purl + "/images/icons/flashCardFaded.png"}></img>
    }
  }

  if (d.completed_flashcards !== null && d.completed_exercises === null){
    exercise = <img src={purl + "/images/icons/exerciseColor.png"}></img>
  } else if (d.completed_flashcards && d.completed_exercises) {
    exercise = <img src={purl + "/images/icons/exerciseChecked.png"}></img>
  } else {
     exercise = <img src={purl + "/images/icons/exerciseFaded.png"}></img>
  }

  if (d.completed_quiz === null && d.completed_exercises){
    quiz = <img src={purl + "/images/icons/quizColor.png"}></img>
  } else if (d.completed_quiz && d.completed_exercises) {
    quiz = <img src={purl + "/images/icons/quizChecked.png"}></img>
  } else {
    quiz = <img src={purl + "/images/icons/quizFaded.png"}></img>
  }



  return (
    <>
      {props.title <= alphabet ? `Alphabet - Level ${props.title}` : null}
      {flashcard}
      {exercise}
      {quiz}
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
