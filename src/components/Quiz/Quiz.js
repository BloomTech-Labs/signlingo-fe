import React, { useState, useEffect } from "react";
import VideoAssessment from "./VideoAssessment";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
const URL = process.env.REACT_APP_BACK_END_BASE_URL;

const Quiz = (props) => {
  const [data, setData] = useState(["dummy", "data"]);
  const [videoOn, setVideoOn] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enableButton, setEnableButton] = useState(false);
  const [result, setResult] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState(0);
  let history = useHistory();
  const { id } = useParams();
  const URL = process.env.REACT_APP_BACK_END_BASE_URL;


  useEffect(() => {
    axios
      .get(`${URL}flashcards/${id}`)
      .then((res) => {
        let data1 = [];
        setData([]);
        res.data.forEach(item => {
          data1.push(item.sign);
          data1.sort(() => Math.random() - 0.5);
          setData(data1);
        });
      })
      .catch((err) => {});
  }, []);

  const backToDash = (arg) => {
    if (arg === "pass") {
      axios
        .put(`${URL}levels/quiz/${id}`, {
          oktaUID: localStorage.getItem("oktaUID"),
        })
        .then((res) => {
          return history.push("/dashboard");
        })
        .catch((err) => {
          console.log("error", err);
        });
    } else {
      return history.push("/dashboard");
    }
  };

  function backToLanding() {
    return (window.location.pathname = `/quiz/${id}`);
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
            onClick={() => backToDash(null)}
            className="closing"
            src={process.env.PUBLIC_URL + "/images/quiz/exitBlackX.png"}
            alt="exit image"
          />
          {/* <h1 className="signLabel">Sign "{data[currentIndex]}"</h1> */}
          <h1 className="signLabel">{data.length > 2 ? `Sign "${data[currentIndex]}"` : null }</h1>
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
                  src={
                    process.env.PUBLIC_URL + "/images/quiz/openCamOverlay.png"
                  }
                  alt="turns camera on"
                ></img>
              </div>
            </>
          )}
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
            onClick={() => backToDash(null)}
            className="closing"
            src={process.env.PUBLIC_URL + "/images/quiz/exitBlackX.png"}
            alt="exit image"
          />
          <p>Quiz</p>
        </div>
        <h1 className="signLabel">{`Your Score: ${score}/${data.length}`}</h1>
        {score === data.length ? (
          <div className="resultsPage">
            <img
              className="quizSuccess"
              src={process.env.PUBLIC_URL + "/images/quiz/success.png"}
              alt="successful quiz attempt"
            />{" "}
            <button onClick={() => backToDash("pass")} className="finishButton">
              Finish
            </button>
          </div>
        ) : (
          <div className="resultsPage">
            <img
              className="quizFailure"
              src={process.env.PUBLIC_URL + "/images/quiz/failure.png"}
              alt="failed quiz attempt"
            />
            <button onClick={() => backToDash(null)} className="finishButton">
              Finish
            </button>
            <button onClick={backToLanding} className="tryAgainButton">
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
};
export default Quiz;
