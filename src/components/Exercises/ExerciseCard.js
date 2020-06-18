import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Overlay from "./ExerciseOverlay";

const ExerciseCard = (props) => {
  let history = useHistory();
  let { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lives, setLives] = useState(3);
  let activeChoice = "";

  //===========creating options============//

  let items = [];
  let options = [];

  for (let i = 0; i < props.flashcards.length; i++) {
    items.push(props.flashcards[i].sign);
  }

  const createOptions = (choices, answer) => {
    let options = [];
    let uniqueOptions = [];
    for (let i = 0; i < 4; i++) {
      let index = Math.floor(Math.random() * choices.length);
      options.push(choices[index]);
    }
    if (!options.includes(answer)) {
      options[1] = answer;
    }
    if (options.length > 4) {
      options.pop();
    }
    do {
      uniqueOptions = [...new Set(options)];
      if (uniqueOptions.length < 4) {
        options.push(choices[Math.floor(Math.random() * choices.length)]);
      }
    } while (uniqueOptions.length < 4);
    return uniqueOptions;
  };

  options = createOptions(items, props.exerciseData[currentIndex].sign);
  console.log("options", options, props.exerciseData[currentIndex].sign);

  //============end of creating options============//

  function progressBarIncrement(index) {
    let progress =
      (((index + 1) / props.exerciseData.length) * 100).toString() + "%";
    document.getElementById("progress-bar").style.width = progress;
  }

  function nextHandler(choice, correctAnswer) {
    if (choice === correctAnswer) {
      setCurrentIndex(currentIndex + 1);
      progressBarIncrement(currentIndex);
      activeChoice = "";
      if (currentIndex === props.exerciseData.length - 1) {
        history.push(`/ExerciseSuccess/${id}`);
      }
    } else {
      document.getElementById("heart").classList.remove("broken");
      activeChoice = "";
      if (lives === 0) {
        history.push("/ExerciseFail");
      } else {
        setCurrentIndex(currentIndex + 1);
        progressBarIncrement(currentIndex);
      }
    }
    activeChoice = "";
  }
  return (
    <>
      <div className="exerciseCards">
        <div className="livesBar">
          <div className="progressContainer">
            <div className="progress">
              <div id="progress-bar" />
            </div>
            <div className="livesHolder">
              <div id="heart">❤</div>
              <h2>{lives}</h2>
            </div>
          </div>
        </div>
        {props.exerciseData[currentIndex].showImage ? (
          <>
            <div className="questionImagePhraseContainer">
              <h2 className="questionImagePhrase">Which letter is this?</h2>
            </div>
            <div className="questionImageContainer">
              <img
                id="questionImage"
                className="questionImage"
                src={props.exerciseData[currentIndex].visual}
                alt="picture of sign"
              ></img>
              <img
                className="whiteResult"
                src={
                  process.env.PUBLIC_URL + "/images/exercises/whiteCheck.png"
                }
                alt="white check"
              />
              <img
                className="whiteResult"
                src={process.env.PUBLIC_URL + "/images/exercises/whiteX.png"}
                alt="white X"
              />
            </div>
            <div className="letterOptionsContainer">
              {options.map((character) => {
                return (
                  <button
                    id={`letterOptionSelected${character}`}
                    className="letterOption"
                    onClick={() => {
                      console.log("clicked letter option");
                      activeChoice = character;
                      document
                        .getElementById("checkExerciseBtn")
                        .classList.remove("toggleClickable");
                      document.getElementById(
                        "checkExerciseBtn"
                      ).style.background = "rgba(255, 227, 101, 0.74)";
                      document.getElementById(
                        `letterOptionSelected${character}`
                      ).style.border = "solid grey";
                      console.log("clicked letter option the end");
                    }}
                  >
                    {character}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="questionLetterContainer">
              <h2 className="questionLetter">
                Which of these is "{props.exerciseData[currentIndex].sign}"
              </h2>
            </div>
            <div id="imageOptionContainer" className="imageOptionContainer">
              {options.map((character) => {
                let localVar = props.flashcards.filter((each) => {
                  return each.sign === character;
                })[0].visual;
                return (
                  <>
                    <img
                      id={`imageOptionSelected${character}`}
                      className="imageOption"
                      src={localVar}
                      onClick={() => {
                        console.log("clicked image option");
                        for (let i = 0; i < options.length; i++) {
                          document.getElementsByClassName("imageOption")[
                            i
                          ].style.border = "solid rgb(241, 241, 241)";
                        }
                        activeChoice = character;
                        document
                          .getElementById("checkExerciseBtn")
                          .classList.remove("toggleClickable");
                        document.getElementById(
                          `imageOptionSelected${character}`
                        ).style.border = "solid grey";
                        console.log("clicked image option the end");
                      }}
                    />
                    <img
                      className="whiteResult"
                      src={
                        process.env.PUBLIC_URL +
                        "/images/exercises/whiteCheck.png"
                      }
                      alt="white check"
                    />
                    <img
                      className="whiteResult"
                      src={
                        process.env.PUBLIC_URL + "/images/exercises/whiteX.png"
                      }
                      alt="white X"
                    />
                  </>
                );
              })}
            </div>
          </>
        )}
        <button
          id="checkExerciseBtn"
          className="toggleClickable"
          onClick={() => {
            document.getElementById("checkExerciseBtn").style.display === "none"
              ? (document.getElementById("checkExerciseBtn").style.display =
                  "flex")
              : (document.getElementById("checkExerciseBtn").style.display =
                  "none");
            document.getElementById("nextExerciseBtn").style.display === "none"
              ? (document.getElementById("nextExerciseBtn").style.display =
                  "flex")
              : (document.getElementById("nextExerciseBtn").style.display =
                  "none");
            if (
              document.getElementById(`imageOptionSelected${activeChoice}`) !==
              null
            ) {
              if (activeChoice === props.exerciseData[currentIndex].sign) {
                document.getElementById(
                  `imageOptionSelected${activeChoice}`
                ).style.background = "#a0d468";
              } else {
                document.getElementById(
                  `imageOptionSelected${activeChoice}`
                ).style.background = "#eb5757";
              }
            }
            if (document.getElementById("questionImage") !== null) {
              if (activeChoice === props.exerciseData[currentIndex].sign) {
                document.getElementById(`questionImage`).style.background =
                  "#a0d468";
              } else {
                document.getElementById(`questionImage`).style.background =
                  "#eb5757";
              }
            }
            if (activeChoice === props.exerciseData[currentIndex].sign) {
              // toggle display:none and display flex on the x or check image
              // return (
              //   <Overlay
              //     result={
              //       activeChoice === props.exerciseData[currentIndex].sign
              //     }
              //   />
              // );
            } else {
              setLives(lives - 1);
              document.getElementById("heart").classList.add("broken");
            }
          }}
        >
          Check
        </button>
        <button
          id="nextExerciseBtn"
          style={{ display: "none" }}
          onClick={() => {
            document.getElementById("checkExerciseBtn").style.display === "none"
              ? (document.getElementById("checkExerciseBtn").style.display =
                  "flex")
              : (document.getElementById("checkExerciseBtn").style.display =
                  "none");
            document.getElementById("nextExerciseBtn").style.display === "none"
              ? (document.getElementById("nextExerciseBtn").style.display =
                  "flex")
              : (document.getElementById("nextExerciseBtn").style.display =
                  "none");
            if (document.getElementsByClassName("imageOption").length > 0) {
              for (let i = 0; i < options.length; i++) {
                document.getElementsByClassName("imageOption")[i].style.border =
                  "solid rgb(241, 241, 241)";
              }
            }
            if (
              document.getElementById(`imageOptionSelected${activeChoice}`) !==
              null
            ) {
              document.getElementById(
                `imageOptionSelected${activeChoice}`
              ).style.background = "rgba(255,255,255,1)";
            }
            if (document.getElementById("questionImage") !== null) {
              document.getElementById(`questionImage`).style.background =
                "rgba(255,255,255,1)";
            }
            nextHandler(activeChoice, props.exerciseData[currentIndex].sign);
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseCard);
