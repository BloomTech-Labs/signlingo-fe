import React from "react";
const ExerciseOverlay = (props) => {
  return (
    <div className="overlay">
        {/* {console.log("%%%% ", document.getElementById("imageOptionContainer"))} */}
      {props.result ? (
        <>
          <img
            className="resultImg"
            src={process.env.PUBLIC_URL + "/images/exercises/whiteCheck.png"}
            alt="green checkmark = correct answer"
          />
          {/* {document.getElementById("imageOptionContainer").classList.add("videoSuccess")} */}
        </>
      ) : (
        <>
          <img
            className="resultImg"
            src={process.env.PUBLIC_URL + "/images/exercises/whiteX.png"}
            alt="red x wrong answer"
          />
          {/* {document.getElementById("imageOptionContainer").classList.add("videoFail")} */}
        </>
      )}
    </div>
  );
};
export default ExerciseOverlay;