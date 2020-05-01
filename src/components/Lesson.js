import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { dummyDataLess } from "./DummyData";

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
      <div>
        <p onClick={backToDash}>X</p>
        <h3>Title</h3>
      </div>

      {data.map((each) => (
        <LessonCard />
      ))}
    </div>
  );
};

export default Lesson;
