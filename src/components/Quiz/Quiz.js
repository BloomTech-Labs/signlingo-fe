import React, { useState } from "react";
import VideoAssessment from "./VideoAssessment";
import { useHistory } from 'react-router-dom';

const Quiz = (props) => {
  const data = ["A", "B", "C", "D", "E"];
  const [videoOn, setVideoOn] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enableButton, setEnableButton] = useState(false);
  const [result, setResult] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState(0);
  let history = useHistory();

  const backToDash= () => {
    return history.push("/dashboard");
  }

  function backToLanding() {
    return window.location.pathname = "/quiz";
  }

  let scoreHandler = (pass) => {
    if (pass) {
      setScore(score + 1);
    }
    setEnableButton(true);
    console.log("score", score);
  };
  let nextHandler = () => {
    if (enableButton) {
      setCurrentIndex(currentIndex + 1);
      setEnableButton(false);
      setResult(null);
      setIsRecording(false);
      document.querySelector("video").classList.remove("videoSuccess");
      document.querySelector("video").classList.remove("videoFail");
    }
    console.log(currentIndex);
  };
  const turnVideoOn = () => {
    setVideoOn(true);
  };
  if (currentIndex !== data.length) {
    return (
      <>
        {/* if we have NOT finished A - E, display the following below */}
        <div className="quiz">
          <img
            onClick={backToDash}
            className="closing"
            src="./images/exitBlackX.png"
            alt="exit image"
          />
          <div className="progressHolder">
            <img
              className="progressBar"
              src="./images/progressBar.png"
              alt="progress bar image"
            />
            <img className="heart" src="./images/heart.png" alt="heart image" />
          </div>
          <h1 className="signLabel">Sign "{data[currentIndex]}"</h1>
          {videoOn ? (
            <VideoAssessment
              testValue={data[currentIndex]}
              scoreHandler={scoreHandler}
              result={result}
              setResult={setResult}
              isRecording={isRecording}
              setIsRecording={setIsRecording}
              videoOn={videoOn}
              setVideoOn={setVideoOn}
            />
          ) : (
            <>
              <div className="cameraOverlay">
                <img
                  onClick={turnVideoOn}
                  src="./images/openCamOverlay.png"
                  alt="turns camera on"
                ></img>
              </div>
            </>
          )}
          {/* {
            !videoOn && !result ? 
            <div className="roundbtn roundbtnGrey" id = 'recBtn'>
                <div className="roundbtnCircle">Record</div>
              </div> 
              :
              <div className="roundbtn" id = 'recBtn'>
                <div className="roundbtnCircle">Record</div>
              </div>
          } */}
          {/* {
            pseudocode for chaining ternary ops
            if videoNotOn, display greyBtn
            else if 
          } */}
          {result === null ? null : (
            <button
              onClick={nextHandler}
              disabled={!enableButton}
              className={enableButton ? "nextButton" : "disableNextButton"}
            >
              Next
            </button>
          )}
        </div>
      </>
    );
  } else {
    // if we have finshed A-E, display the following
    return (
      <div className="quizDemo">
        <div className="quizDemoHead">
          <img
            onClick={backToDash}
            className="closing"
            src="./images/exitBlackX.png"
            alt="exit image"
          />
          <p>Quiz</p>
        </div>
        <h1 className="signLabel">{`Your Score: ${score}/${data.length}`}</h1>
        {score === data.length ? (
          <div className = "resultsPage">
            <img
              className="quizSuccess"
              src="./images/success.png"
              alt="successful quiz attempt"
            />{" "}
            <button onClick={backToDash} className="finishButton">Finish</button>
          </div>
        ) : (
          <div className="resultsPage">
            <img
              className="quizFailure"
              src="./images/failure.png"
              alt="failed quiz attempt"                          
            />
            <button onClick={backToDash} className="finishButton">Finish</button>
            <button onClick={backToLanding} className="tryAgainButton">Try Again?</button>
          </div>
        )}
      </div>
    );
  }
};
export default Quiz;
