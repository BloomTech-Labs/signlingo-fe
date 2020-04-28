import React from "react";
import crownSm from "../images/icons/progress crown icon.png";
import practiceSm from "../images/icons/practiceSm.png";
import lessonSm from "../images/icons/lessonSm.png";
import quizSm from "../images/icons/quizSm.png";

const DashboardCard = (props) => {
  return (
    <div>
      <h2>Alphabet - Level {props.data.level}</h2>
      <div>
        <p>progress bar and crown icon goes here.</p>
        <img src={crownSm} alt="A completion crown" />
      </div>

      <div>
        <div>
          <img src={lessonSm} alt="A lessons icon" />
          <p>{props.data.lesson.text}</p>
        </div>
      </div>

      <div>
        <div>
          <img src={practiceSm} alt="A practice icon" />
          <p>{props.data.practice.text}</p>
        </div>
        <div>
          <img src={quizSm} alt="A quiz icon" />
          <p>{props.data.quiz.text}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
