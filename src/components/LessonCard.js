import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import test from "../images/icons/SignA.png";

const LessonCard = (props) => {
  const [imageOn, setImageOn] = useState(false);

  function flipCard() {
    setImageOn(!imageOn);
  }

  return (
    <div className="lessonCards">
      <ReactCardFlip isFlipped={imageOn}>
        <div onClick={flipCard} className="frame">
          <img src={test} alt="test" />
        </div>
        <div onClick={flipCard} className="frame">
          {props.data.letter}
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default LessonCard;
