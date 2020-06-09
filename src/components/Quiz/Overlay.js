import React from "react";
const Overlay = (props) => {
  return (
    <div className='overlay'>
      {props.result ? (
        <>
        <img
          className="resultImg"
          src="./images/quiz/checkMarkOverlay.png"
          alt="green checkmark = correct answer"
          />
          {document.querySelector("video").classList.add("videoSuccess")}
          {/* {setTimeout(function() {userChoice_div.classList.remove("videoSuccess"); }, 300)} */}
          </>
      ) : (
        <>
        <img
          className="resultImg"
          src="./images/quiz/redXOverlay.png"
          alt="red x wrong answer"
        />
        {document.querySelector("video").classList.add("videoFail")}
        {/* {setTimeout(function() {userChoice_div.classList.remove("videoFail"); }, 300)}; */}
        </>
      )}
    </div>
  );
};
export default Overlay;