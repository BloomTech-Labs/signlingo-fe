import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import flipArrow from "../images/icons/flipArrow.png";

const LessonCard = (props) => {
  const [imageOn, setImageOn] = useState(false);

  // accepts the letter of the flipped card
  function flipCard(letter) {
    // sets true or false
    setImageOn(!imageOn);

    // checks to see if letter is passed in and is not already inside the flipped array
    // that is passed down from props then it will add it to the flipped array
    if (letter && !props.flipped.includes(letter)) {
      props.setFlipped([...props.flipped, letter]);
    }
  }

  return (
    <div className="lessonCards">
      {/* uses ReactCardFlip npm package to flip card -- first div is the front second div is the back */}
      <ReactCardFlip isFlipped={imageOn}>
        {/* onClick uses function FlipCard which flips card and accepts the letter */}
        <div onClick={() => flipCard(props.data.letter)} className="frame">
          <div className="flipArrow">
            <img src={flipArrow} alt="flip arrow" />
          </div>
          <img src={props.data.image} alt="sign" />
        </div>
        {/* onClick uses function FlipCard which flips card */}
        <div onClick={() => flipCard()} className="frame">
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
