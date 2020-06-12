import React from "react";
import { connect } from "react-redux";

const FlashcardWrapper = (props) => {
    return (
        <>
            <p>FLashcard page wrapper!</p>
            {console.log(props)}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        
    };
  };
  
  const mapDispatchToProps = {};
  
  export default connect(mapStateToProps, mapDispatchToProps)(FlashcardWrapper);