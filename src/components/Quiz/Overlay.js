import React from 'react';
// need to import images for fail/pass

const Overlay = (props) => {

   return (
      <>
      <p>This is a placeholder for the overlay component</p>
      {props.result ? "<img src='passImg'/>" : "<img src='failImg'/>"}
      </>
   );

};

export default Overlay