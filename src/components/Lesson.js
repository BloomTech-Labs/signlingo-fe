import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { dummyDataLess } from "./DummyData";

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
        <p onClick={backToDash}>X</p>
        <h3>Title</h3>
      </div>

      {data.map((each) => (
        <LessonCard key={each.id} data={each} />
      ))}
    </div>
  );
};

export default Lesson;
