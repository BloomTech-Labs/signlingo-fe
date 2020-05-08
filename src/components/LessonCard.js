import React, { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import test from "../images/icons/SignA.png";
import flipArrow from "../images/icons/flipArrow.png";

const LessonCard = (props) => {
  const [imageOn, setImageOn] = useState(false);


  function flipCard(letter) {
    const addLetter=letter;
    setImageOn(!imageOn);

    if(addLetter){
      if(props.flipped.includes(addLetter)){
      props.setFlipped([...props.flipped]);
      } else {
        props.setFlipped([...props.flipped, addLetter]);
      }
    }
  }


  
  
  console.log("this is the flipped array", props.flipped)
  return (
    <div className="lessonCards">
      <ReactCardFlip isFlipped={imageOn}>
        <div onClick={()=>flipCard(props.data.letter)} className="frame">
          <div className="flipArrow">
            <img src={flipArrow} alt="flip arrow" />
          </div>
          <img src={test} alt="test" />
        </div>
        <div onClick={()=>flipCard()} className="frame">
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
