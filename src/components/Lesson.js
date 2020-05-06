import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { dummyDataLess } from "./DummyData";
import x from "../images/icons/x.png";
import LessonCard from "./LessonCard";

const Lesson = (props) => {
  const history = useHistory();
  const [data, setData] = useState([]);

  function backToDash() {
    return history.push("/dashboard");
  }

  function finishedHandler() {
    //redirect to dashboard
    history.push("/dashboard");
    //add action creator to toggle lesson.completed to true
  }

  useEffect(() => {
    setData(dummyDataLess);
  }, []);

  return (
    <div className="lesson">
      <div className="lessonBar">
        <img src={x} alt="letter x" onClick={backToDash} />
        {/* In order to get the text in the h3, we need to hook up Lesson.js to the redux store to get 
        the DummyDataDash array. OR find a way to pass that info as a prop from DashboardCard,
        however it's not really a parent to this component */}
        <h3> PROPS DATA HERE flashcards</h3>
      </div>

      {data.map((each) => (
        <LessonCard key={each.id} data={each} />
      ))}

      {/*add ternary logic so that when user touches all of the flashcards, the div takes on an 
        additional finishedBttnActive class. Styling is already written in Sass file*/}
      <div className="finishedBttn" onClick={finishedHandler}>
        Finished
      </div>
    </div>
  );
};

export default Lesson;
