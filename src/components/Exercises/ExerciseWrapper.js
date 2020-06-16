import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Exercise from "./ExerciseCard";
const URL = process.env.REACT_APP_BACK_END_BASE_URL;

const ExerciseWrapper = (props) => {
  const { id } = useParams();
  let history = useHistory();
  const [flashcardData, setFlashcardData] = useState([]);

  function backToDash() {
    return history.push("/dashboard");
  }

  useEffect(() => {
    axios
      .get(`${URL}flashcards/${id}`)
      .then((res) => {
        setFlashcardData(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <div className="exercise">
        <div className="exerciseBar">
          <img
            src={process.env.PUBLIC_URL + "/images/icons/x.png"}
            alt="letter x"
            onClick={backToDash}
          />
        </div>
        <div className="livesBar">
          <img
            className="progressBarExercise"
            src={process.env.PUBLIC_URL + "/images/icons/progressBarColor.png"}
            alt="A progress Bar"
          />
          <img
            className="heartExercise"
            src={process.env.PUBLIC_URL + "/images/exercises/heart.png"}
            alt="A heart and lives count"
          />
        </div>
        {flashcardData &&
          flashcardData.map((each) => <Exercise key={each.id} data={each} />)}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseWrapper);
