import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const ExerciseCard = (props) => {
  let history = useHistory();
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
      options[Math.floor(Math.random() * choices.length)] = answer;
    }
    do {
      uniqueOptions = [...new Set(options)];
      options.push(choices[Math.floor(Math.random() * choices.length)]);
    } while (uniqueOptions.length < 4);
    return uniqueOptions;
  };

  options = createOptions(items, props.exerciseData[currentIndex].sign);
  console.log("options", options, props.exerciseData[currentIndex].sign);

  //============end of creating options============//

  function nextHandler(choice, correctAnswer) {
    if (choice === correctAnswer) {
      setCurrentIndex(currentIndex + 1);
      if (currentIndex === props.exerciseData.length - 1) {
        history.push("/ExerciseSuccess");
        //put axios
      }
    } else {
      setLives(lives - 1);
      if (lives === 0) {
        history.push("/ExerciseFail");
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }
    activeChoice = "";
  }
  return (
    <>
      <div className="livesBar">
        <img
          className="progressBarExercise"
          src={process.env.PUBLIC_URL + "/images/icons/progressBarColor.png"}
          alt="A progress Bar"
        />
        <img
          className="heartExercise"
          src={process.env.PUBLIC_URL + "/images/exercises/heart.png"}
          alt="A heart"
        />
        <h2>{lives}</h2>
      </div>

      <div className="exerciseCards">
        {props.exerciseData[currentIndex].showImage ? (
          <>
            <div className="questionImagePhraseContainer">
              <h2 className="questionImagePhrase">Which letter is this?</h2>
            </div>
            <img
              className="questionImage"
              src={props.exerciseData[currentIndex].visual}
              alt="picture of sign"
            ></img>
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
            <div className="imageOptionContainer">
              {options.map((character) => {
                let localVar = props.flashcards.filter((each) => {
                  return each.sign === character;
                })[0].visual;
                return (
                  <img
                    id={`imageOptionSelected${character}`}
                    className="imageOption"
                    src={localVar}
                    onClick={() => {
                      console.log("clicked image option");
                      activeChoice = character;
                      document
                        .getElementById("checkExerciseBtn")
                        .classList.remove("toggleClickable");
                      document.getElementById(
                        "checkExerciseBtn"
                      ).style.background = "rgba(255, 227, 101, 0.74)";
                      document.getElementById(
                        `imageOptionSelected${character}`
                      ).style.border = "solid grey";
                      console.log("clicked image option the end");
                    }}
                  />
                );
              })}
            </div>
          </>
        )}
        <button
          id="checkExerciseBtn"
          className="toggleClickable"
          onClick={() => {
            console.log("clicked check");
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
            activeChoice === props.exerciseData[currentIndex].sign
              ? console.log("you did it!")
              : console.log("you failed...");
            // document.getElementsByClassName("imageOption").style.border =
            //   "solid rgb(241, 241, 241);";
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
