import { axiosWithAuth } from "../utils/axiosWithAuth";

export const GET_ALL_LEVELS_START = "GET_ALL_LEVELS_START";
export const GET_ALL_LEVELS_SUCCESS = "GET_ALL_LEVELS_SUCCESS";
export const GET_ALL_LEVELS_FAIL = "GET_ALL_LEVELS_FAIL";

export const getAllLevels = () => (dispatch) => {
  dispatch({
    type: GET_ALL_LEVELS_START,
    payload: "Retrieving Your Dashboard Info...",
  });
  return axiosWithAuth()
    .get("http://localhost:5000/levels/")
    .then((res) => {
      // res.data === [{...}, {...},] with each object holding an id and a name.
      // the name is a string of letters representing each letter inside a level.
      // eventually the same for numbers, words, phrases so on...
      dispatch({ type: GET_ALL_LEVELS_SUCCESS, payload: res.data });
      return "Promise Resolved";
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
export const GET_ALL_USER_LEVELS_START = "GET_ALL_USER_LEVELS_START";
export const GET_ALL_USER_LEVELS_SUCCESS = "GET_ALL_USER_LEVELS_SUCCESS";
export const GET_ALL_USER_LEVELS_FAILURE = "GET_ALL_USER_LEVELS_FAILURE";

export const getAllUserLevelsByID = () => (dispatch) => {
  dispatch({
    type: GET_ALL_USER_LEVELS_START,
    payload: "Getting user_levels data...",
  });
  axiosWithAuth()
    .get(`http://localhost:5000/levels/check/${localStorage.getItem("userID")}`)
    .then((res) => {
      // res.data = [{}, {}...] with each object holding completed_excercises,
      // completed_flashcards, completed_quiz all defaulted to null with possible timestamp value,
      // an id, level_id, and user_id.
      dispatch({ type: GET_ALL_USER_LEVELS_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch({
        type: GET_ALL_USER_LEVELS_FAILURE,
        payload: "Failed to get all user_levels data",
      });
    });
};

// this action creator runs because a user didn't have all the levels that they need to
// linked up to their account. This action creator takes care of that case. Could have happened
// because they are a brand new user, or new levels were added since last login
export const ADD_LEVELS_START = "ADD_LEVELS_START";
export const ADD_LEVELS_SUCCESS = "ADD_LEVELS_SUCCESS";
export const ADD_LEVELS_FAILURE = "ADD_LEVELS_FAILURE";

export const addLevelsToUserAccount = (levels, userLevels) => (dispatch) => {
  dispatch({
    type: ADD_LEVELS_START,
    payload: "Adding Levels to User Account...",
  });

  // Prep for axios request by preparing levels to add
  let levelsToAdd = [];
  // handle the case of brand new user if userlevels length === 0 by
  // adding all levels available in database to user account (aka user_levels table on back end)
  if (userLevels.length === 0) {
    levels.forEach((level) => {
      levelsToAdd.push(level.id);
      // if user has less levels then are available add those levels only instead
    });
  } else {
    let levelsToAddObjs = levels.filter((level) => {
      // return false it wont be included
      // return true it will be included in array
      // we only want to return true if level.id is not already available in user levels
      for (let i = 0; i < userLevels.length; i++) {
        if (userLevels[i].level_id === level.id) {
          return false;
        }
      }
      return true;
    });
    // i now have an array of objs that include id keys with the values I want
    levelsToAddObjs.forEach((level) => {
      levelsToAdd.push(level.id);
    });
  }

  for (let i = 0; i < levelsToAdd.length; i++) {
    console.log(levelsToAdd[i])
    // promise.all to wait for all database .inserts to finish on back end if I passed an array
    // or front end and wait for all the network requests to finish. 
    axiosWithAuth()
      .post(
        `http://localhost:5000/levels/${localStorage.getItem("userID")}`, { level_id: levelsToAdd[i] }
      )
      .then((res) => {
        dispatch({ type: ADD_LEVELS_SUCCESS, payload: res.data });
        // console.log("TESTING add userlevels", res.data);
      })
      .catch((error) => {
        dispatch({
          type: ADD_LEVELS_FAILURE,
          payload: "Failed to add levels to user account",
        });
      });
  }
};
