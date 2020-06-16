import React from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Exercise from "./ExerciseCard";
const URL = process.env.REACT_APP_BACK_END_BASE_URL;

const ExerciseWrapper = (props) => {
    const { id } = useParams();
    let history = useHistory();
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
            
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        
    };
  };
  
  const mapDispatchToProps = {};
  
  export default connect(mapStateToProps, mapDispatchToProps)(ExerciseWrapper);