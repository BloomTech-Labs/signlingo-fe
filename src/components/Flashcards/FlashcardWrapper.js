import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Flashcard from "./Flashcard";
const URL = process.env.REACT_APP_BACK_END_BASE_URL;

const FlashcardWrapper = (props) => {
  let history = useHistory();
  const { id } = useParams();
  const [flashcardData, setFlashcardData] = useState([]);
  const [flipped, setFlipped] = useState([]);

  function backToDash() {
    return history.push("/dashboard");
  }

  const finishedHandler = async () => {
    axios
      .put(`${URL}levels/flashcard/${id}`, {
        oktaUID: localStorage.getItem("oktaUID"),
      })
      .then((completed) => {
        console.log("CHANGED COMPLETED STATUS", completed);
      })
      .catch((error) => {
        console.log("Error changing completed status of flashcard");
      });
    history.push("/dashboard");
  };

  let flashTitle =
    id === "1"
      ? "A - E"
      : id === "2"
      ? "F - J"
      : id === "3"
      ? "K - O"
      : id === "4"
      ? "P - T"
      : id === "5"
      ? "U - Z"
      : "Add Future Level Name Here"; // add more levels here if necessary

  useEffect(() => {
    axios
      .get(`${URL}flashcards/${id}`)
      .then((res) => {
        setFlashcardData(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <div className="lesson">
        <div className="lessonBar">
          <img
            src={process.env.PUBLIC_URL + "/images/icons/x.png"}
            alt="letter x"
            onClick={backToDash}
          />
          <h3>{`${flashTitle} flashcards`}</h3>
        </div>

        {flashcardData &&
          flashcardData.map((each) => (
            <Flashcard
              key={each.id}
              data={each}
              setFlipped={setFlipped}
              flipped={flipped}
            />
          ))}
        {/*ternary conditionally renders finished button with color and functionality */}
        {flipped.length === flashcardData.length ? (
          <div
            className="finishedBttn finishedBttnActive"
            onClick={finishedHandler}
          >
            Finished
          </div>
        ) : (
          <div className="finishedBttn">Finished</div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardWrapper);
