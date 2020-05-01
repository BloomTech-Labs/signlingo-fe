import React, { useState } from "react";

const LessonCard = (props) => {
  const [imageOn, setImageOn] = useState(false);

  return (
    <div className="flash" onClick={() => setImageOn(!imageOn)}>
      {imageOn ? (
        <p className="flashImage">{props.data.img}</p>
      ) : (
        <p className="flashLetter">{props.data.letter}</p>
      )}
    </div>
  );
};

export default LessonCard;
