import React, { useState } from "react";
import VideoAssessment from "./VideoAssessment";

//  TODO
//  import ProgressBar and Lives component when its ready (RC 2 or 3) before that put a placeholder image
//  Need to build up overlays
//  Idea for currentTestValue: either passed down as props, or read from the URL params
const Quiz = (props) => {
  const [videoOn, setVideoOn] = useState(false);

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
      <h1 className="signLabel">Sign "A"</h1>
      {videoOn ? (
        <VideoAssessment testValue="currentTestValue" />
      ) : (
        <div className="cameraOverlay">
          <img onClick={turnVideoOn} src="./images/openCamOverlay.png" alt="turns camera on"></img>
        </div>
      )}
      <button className="nextButton">Next</button>
    </div>
  );
};

export default Quiz;
