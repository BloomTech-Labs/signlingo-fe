import React, { useState } from "react";
import { connect } from "react-redux";
import ReactCardFlip from "react-card-flip";
// import flipArrow from "../images/icons/flipArrow.png";

const Flashcard = (props) => {
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
        <div onClick={() => flipCard(props.data.sign)} className="frame">
          <div className="flipArrow">
            <img src={process.env.PUBLIC_URL + '/images/icons/flipArrow.png'} alt="flip arrow" />
          </div>
          <img src={props.data.visual} alt="sign" />
        </div>
        {/* onClick uses function FlipCard which flips card */}
        <div onClick={() => flipCard()} className="frame">
          <div className="flipArrow">
            <img src={process.env.PUBLIC_URL + '/images/icons/flipArrow.png'} alt="flip arrow" />
          </div>
          <b>{props.data.sign}</b>
        </div>
      </ReactCardFlip>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Flashcard);
