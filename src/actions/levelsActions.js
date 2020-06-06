import { axiosWithAuth } from "../utils/axiosWithAuth";

export const GET_ALL_LEVELS_START = "GET_ALL_LEVELS_START";
export const GET_ALL_LEVELS_SUCCESS = "GET_ALL_LEVELS_SUCCESS";
export const GET_ALL_LEVELS_FAIL = "GET_ALL_LEVELS_FAIL";

export const getAllLevels = () => (dispatch) => {
  dispatch({
    type: GET_ALL_LEVELS_START,
    payload: "Retrieving Your Dashboard Info...",
  });
  axiosWithAuth()
    .get("http://localhost:5000/levels/")
    .then((res) => {
      // res.data === [{...}, {...},] with each object holding an id and a name.
      // the name is a string of letters representing each letter inside a level.
      // eventually the same for numbers, words, phrases so on...
      dispatch({ type: GET_ALL_LEVELS_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch({
        type: GET_ALL_LEVELS_FAIL,
        payload: "Failed to Retrieve Sign Lingo Levels!!",
      });
    });
};

// scans user_levels table to see if user has all levels in levels table associated with his
// or her user id, if not, then levels are added to join table
export const CHECK_USER_LEVELS_START = "CHECK_USER_LEVELS_START";
export const CHECK_USER_LEVELS_SUCCESS = "CHECK_USER_LEVELS_SUCCESS";
export const CHECK_USER_LEVELS_FAILURE = "CHECK_USER_LEVELS_FAILURE";

export const checkLevels = () => (dispatch) => {
  dispatch({
    type: CHECK_USER_LEVELS_START,
    payload: "Checking If User Has Levels In Database Linked To Their Account Already...",
  });
  axiosWithAuth()
    .get(`http://localhost:5000/levels/check/${localStorage.getItem("userID")}`)
    .then((res) => {
      // res.data = [{}, {}...] with each object holding completed_excercises, 
      // completed_flashcards, completed_quiz all defaulted to null with possible timestamp value,
      // an id, level_id, and user_id. 
      dispatch({ type: CHECK_USER_LEVELS_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch({
        type: CHECK_USER_LEVELS_FAILURE,
        payload: "Failed to check user status in relation to levels",
      });
    });
};

// this action creator runs because a user didn't have all the levels that they need to
// linked up to their account. This action creator takes care of that case. Could have happened
// because they are a brand new user, or new levels were added since last login
export const ADD_LEVELS_START = "ADD_LEVELS_START";
export const ADD_LEVELS_SUCCESS = "ADD_LEVELS_SUCCESS";
export const ADD_LEVELS_FAILURE = "ADD_LEVELS_FAILURE";

export const addLevelsToUserAccount = () => (dispatch) => {
    dispatch({
      type: ADD_LEVELS_START,
      payload: "Adding Levels to User Account...",
    });
    axiosWithAuth()
      .get(`http://localhost:5000/levels/${localStorage.getItem("userID")}`)
      .then((res) => {
        // dispatch({ type: ADD_LEVELS_SUCCESS, payload: res.data });
        console.log("ADDED USER LEVELS response", res.data)
      })
      .catch((error) => {
        dispatch({
          type: ADD_LEVELS_FAILURE,
          payload: "Failed to add levels to user account",
        });
      });
  };

