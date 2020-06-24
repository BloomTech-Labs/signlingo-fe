import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
const purl = process.env.PUBLIC_URL;

const ExerciseCard = (props) => {
  let history = useHistory();
  let { id } = useParams(); //id of the level
  const [currentIndex, setCurrentIndex] = useState(0); //index of the question we're showing to the user at the moment
  const [lives, setLives] = useState(3); //amount of lives user have
  let activeChoice = ""; // user's answer
  let whiteCheck = document.createElement("img");
  let whiteX = document.createElement("img");
  whiteCheck.src = purl + "/images/exercises/whiteCheck.png";
  whiteX.src = purl + "/images/exercises/whiteX.png";
  whiteCheck.alt = "white checkmark";
  whiteX.alt = "white X";
  whiteCheck.classList.add("whiteResult");
  whiteX.classList.add("whiteResult");
  whiteCheck.id = "resultImage";
  whiteX.id = "resultImage";

  //===========creating options============//
  let items = [];
  let options = [];
  // creating an array with all letters in the level
  for (let i = 0; i < props.flashcards.length; i++) {
    items.push(props.flashcards[i].sign);
  }
  const createOptions = (choices, answer) => {
    let options = [];
    let uniqueOptions = [];
    // creating an array with 4 random options to choose from
    for (let i = 0; i < 4; i++) {
      let index = Math.floor(Math.random() * choices.length);
      options.push(choices[index]);
    }
    // making sure this options including correct answer
    if (!options.includes(answer)) {
      options[1] = answer;
    }
    // if options array with correct answer have 5 elements, delete one
    if (options.length > 4) {
      options.pop();
    }
    // if options repeating inside the array (we got 2 "A", or 3 "B"), delete duplicates and replace with another letter.
    // Do so until we get array of 4 letters, including correct answer, no duplicates.
    do {
      uniqueOptions = [...new Set(options)];
      if (uniqueOptions.length < 4) {
        options.push(choices[Math.floor(Math.random() * choices.length)]);
      }
    } while (uniqueOptions.length < 4);
    return uniqueOptions;
  };
  // call function above to create options for current question
  options = createOptions(items, props.exerciseData[currentIndex].sign);
  //============end of creating options============//
  // function to change progress bar appearance based on current index of the question
  function progressBarIncrement(index) {
    let progress =
      (((index + 1) / props.exerciseData.length) * 100).toString() + "%"; //getting a string showing our progress in %
    document.getElementById("progress-bar").style.width = progress; // giving width of our progress to the progress bar
  }

  function nextHandler(choice, correctAnswer) {
    // NEXT HANDLER
    // change option background to white
    // remove white checkmarks and white x's
    // make check button unclickable and change background to light grey
    for (let i = 0; i < options.length; i++) {
      if (document.getElementsByClassName("imageOption")[i]) {
        document.getElementsByClassName("imageOption")[i].style.background =
          "white";
      }
    }
    document.getElementById("resultImage").remove();
    document
      .getElementById("checkExerciseBtn")
      .classList.add("toggleClickable");
    document.getElementById("checkExerciseBtn").style.background =
      "rgb(241, 241, 241)";
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
            <div id="questionImageContainer" className="questionImageContainer">
              <img
                id="questionImage"
                className="questionImage"
                src={props.exerciseData[currentIndex].visual}
                alt="picture of sign"
              ></img>
            </div>
            <div className="letterOptionsContainer">
              {options.map((character) => {
                return (
                  <button
                    id={`letterOptionSelected${character}`}
                    className="letterOption"
                    onClick={() => {
                      activeChoice = character;
                      // LETTER OPTIONS A, B, C, D
                      // check exercise button set CLICKABLE, TURNED YELLOW
                      // letter option BORDER GREY
                      document
                        .getElementById("checkExerciseBtn")
                        .classList.remove("toggleClickable");
                      document.getElementById(
                        "checkExerciseBtn"
                      ).style.background = "rgba(255, 227, 101, 0.74)";
                      document.getElementById(
                        `letterOptionSelected${character}`
                      ).style.border = "solid grey";
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
                  <div
                    id={`overlayImage${character}`}
                    className="overlayImages"
                  >
                    <img
                      id={`imageOptionSelected${character}`}
                      className="imageOption"
                      src={localVar}
                      onClick={() => {
                        // IMAGE OPTIONS
                        // all image options set BORDER LIGHT GREY
                        // specific image option clicked set BORDER GREY
                        // check button set CLICKABLE
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
                        document.getElementById(
                          "checkExerciseBtn"
                        ).style.background = "rgba(255, 227, 101, 0.74)";
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}
        <button
          id="checkExerciseBtn"
          className="toggleClickable"
          onClick={() => {
            // CHECK BUTTON
            // toggle display on or off
            // set background red or green based on answer
            // remove life and start heart animation if wrong answer
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
                document
                  .getElementById(`overlayImage${activeChoice}`)
                  .prepend(whiteCheck);
              } else {
                document.getElementById(
                  `imageOptionSelected${activeChoice}`
                ).style.background = "#eb5757";
                document
                  .getElementById(`overlayImage${activeChoice}`)
                  .prepend(whiteX);
              }
            }
            if (document.getElementById("questionImage") !== null) {
              if (activeChoice === props.exerciseData[currentIndex].sign) {
                document.getElementById(`questionImage`).style.background =
                  "#a0d468";
                document
                  .getElementById(`questionImageContainer`)
                  .prepend(whiteCheck);
              } else {
                document.getElementById(`questionImage`).style.background =
                  "#eb5757";
                document
                  .getElementById(`questionImageContainer`)
                  .prepend(whiteX);
              }
            }
            if (activeChoice === props.exerciseData[currentIndex].sign) {
              // this logic is working, using other kinds of logic if seems to throw
              // an error! Feel free to refactor later if desired.
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
            // NEXT BUTTON
            // toggle display on or off
            // set all image options to have light grey border
            // invoke next handler
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
