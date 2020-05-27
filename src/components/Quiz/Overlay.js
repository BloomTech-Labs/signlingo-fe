import React from "react";

const Overlay = (props) => {
  return (
    <>
      {props.result ? (
        <img
          className="resultImg"
          src="./images/checkMarkOverlay.png"
          alt="green checkmark = correct answer"
        />
      ) : (
        <img
          className="resultImg"
          src="./images/redXOverlay.png"
          alt="red x wrong answer"
        />
      )}
    </>
  );
};

export default Overlay;
