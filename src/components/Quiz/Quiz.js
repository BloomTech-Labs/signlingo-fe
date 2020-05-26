import React, { useState } from "react";
import VideoAssessment from "./VideoAssessment";

//  TODO
//  import ProgressBar and Lives component when its ready (RC 2 or 3) before that put a placeholder image
//  Need to build up overlays
//  Idea for currentTestValue: either passed down as props, or read from the URL params
const Quiz = (props) => {

  const data = ['a', 'b', 'c', 'd', 'e'];
  const [videoOn, setVideoOn] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  let score = 0;
  let enableButton = false;
  // state ideas
  // nextButtonTrue/False, 
  // incrementing integer to keep track of user score, 
  // passing down a function to VideoAssessment to manipulate integer
  // videoAssessment needs to be able to turn the next button on after getting results back from DS API
  // Next button needs to be turned on after each letter

  let scoreHandler = () => {
    return score++;
  };

  let nextHandler = () => {
    if (enableButton) {
      setCurrentIndex(currentIndex + 1)
      enableButton = false;
    }
  }

  const turnVideoOn = () => {
    setVideoOn(true);
  };

  return (
    <div className="quiz">
      <img className="closing" src="./images/exitBlackX.png" alt="exit image" />
      <div className="progressHolder">
        <img
          className="progressBar"
          src="./images/progressBar.png"
          alt="progress bar image"
        />
        <img className="heart" src="./images/heart.png" alt="heart image" />
      </div>
  <h1 className="signLabel">Sign {data[currentIndex]}}</h1>
      {videoOn ? (
        <VideoAssessment testValue = {data[currentIndex]} scoreHandler = {scoreHandler} />
      ) : (
        <div className="cameraOverlay">
          <img onClick={turnVideoOn} src="./images/openCamOverlay.png" alt="turns camera on"></img>
        </div>
      )}
      <button onClick={nextHandler} disabled={!enableButton} className={enableButton ? "nextButton" : "disableNextButton"}>Next</button> 
    </div>
  );
};

export default Quiz;

