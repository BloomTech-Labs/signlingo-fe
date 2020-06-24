import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import ExerciseCard from "./ExerciseCard";
const URL = process.env.REACT_APP_BACK_END_BASE_URL;

const ExerciseWrapper = (props) => {
  const { id } = useParams();
  let history = useHistory();
  const [flashcardData, setFlashcardData] = useState([]);
  let exerciseData = [];

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  function createExerciseData(flashcardData) {
    for (let i = 0; i < flashcardData.length; i++) {
      exerciseData.push({
        sign: flashcardData[i].sign,
        visual: flashcardData[i].visual,
        showImage: false,
      });
      exerciseData.push({
        sign: flashcardData[i].sign,
        visual: flashcardData[i].visual,
        showImage: true,
      });
    }
    shuffle(exerciseData);
  }

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

        {flashcardData.length !== 0 && console.log(flashcardData)}
        {flashcardData.length !== 0 && createExerciseData(flashcardData)}
        {flashcardData.length !== 0 && console.log("&&&&&", exerciseData)}

        {flashcardData.length !== 0 && (
          <ExerciseCard
            key={flashcardData[0].id}
            flashcards={flashcardData}
            exerciseData={exerciseData}
          />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseWrapper);
