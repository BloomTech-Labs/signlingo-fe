import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import x from "../images/icons/x.png";
import LessonCard from "./LessonCard";
import { lessonFinish } from "../actions/FinishLevelFeature";
import { getPics } from "../actions/getPics";

const Lesson = (
  { selectedLesson, signImages, getPics, lessonFinish },
  props
) => {
  const history = useHistory();
  const [flipped, setFlipped] = useState([]);

  function backToDash() {
    return history.push("/dashboard");
  }

  const finishedHandler = async () => {
    //action creator toggles Lesson boolean to true so image will have a checkmark and practice img will light up
    await lessonFinish(selectedLesson.User_ID, selectedLesson.Level);
    history.push("/dashboard");
  }

  useEffect(() => {
    getPics(selectedLesson.signs);
  }, []);

  return (
    <div className="lesson">
      <div className="lessonBar">
        <img src={x} alt="letter x" onClick={backToDash} />
        <h3>{`${selectedLesson.signs} flashcards`}</h3>
      </div>

      {signImages.map((each) => (
        <LessonCard
          key={each.id}
          data={each}
          setFlipped={setFlipped}
          flipped={flipped}
        />
      ))}
      {/*ternary conditionally renders finished button with color and functionality */}
      {flipped.length === signImages.length ? (
        <div
          className="finishedBttn finishedBttnActive"
          onClick={finishedHandler}
        >
          Finished
        </div>
      ) : (
        <div className="finishedBttn">Finished</div>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    selectedLesson: state.lesson.selectedLesson,
    signImages: state.lesson.signImages,
  };
}

export default connect(mapStateToProps, { getPics, lessonFinish })(Lesson);
