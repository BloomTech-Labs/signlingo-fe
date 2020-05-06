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

  useEffect(() => {
    setData(dummyDataLess);
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default Lesson;
