import React from "react";
import { connect } from "react-redux";

const Flashcard = (props) => {
    return (
        <>
            <p>Your at the flashcard card!</p>
            {console.log(props.levelData)}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
    };
  };
  
  const mapDispatchToProps = {};
  
  export default connect(mapStateToProps, mapDispatchToProps)(Flashcard);