import React from 'react';

const Overlay = (props) => {

   return (
      <>
      <p>This is a placeholder for the overlay component</p>
      {props.result ? <img src='./images/checkMarkOverlay.png' alt='green checkmark = correct answer'/> : <img src='./images/redXOverlay.png' alt='red x = wrong answer'/>}
      </>
   );

};

export default Overlay