//adding check marks on top of video component when we're getting results from DS API

import React from "react";
const Overlay = (props) => {
  return (
    <div className="overlay">
      {props.result ? (
        <>
          <img
            className="resultImg"
            src={process.env.PUBLIC_URL + "/images/quiz/checkMarkOverlay.png"}
            alt="green checkmark = correct answer"
          />
          {document.querySelector("video").classList.add("videoSuccess")}
        </>
      ) : (
        <>
          <img
            className="resultImg"
            src={process.env.PUBLIC_URL + "/images/quiz/redXOverlay.png"}
            alt="red x wrong answer"
          />
          {document.querySelector("video").classList.add("videoFail")}
        </>
      )}
    </div>
  );
};
export default Overlay;
