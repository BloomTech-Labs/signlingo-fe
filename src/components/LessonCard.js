import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import test from "../images/icons/SignA.png";
import flipArrow from "../images/icons/flipArrow.png";

const LessonCard = (props) => {
  const [imageOn, setImageOn] = useState(false);

  function flipCard() {
    setImageOn(!imageOn);
  }

  return (
    <div className="lessonCards">
      <ReactCardFlip isFlipped={imageOn}>
        <div onClick={flipCard} className="frame">
          <div className="flipArrow">
            <img src={flipArrow} alt="flip arrow" />
          </div>
          <img src={test} alt="test" />
        </div>
        <div onClick={flipCard} className="frame">
          <div className="flipArrow">
            <img src={flipArrow} alt="flip arrow" />
          </div>
          <b>{props.data.letter}</b>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default LessonCard;
