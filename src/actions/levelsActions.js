import { axiosWithAuth } from "../utils/axiosWithAuth";

export const GET_ALL_LEVELS_SUCCESS = "GET_ALL_LEVELS_SUCCESS";
export const GET_ALL_LEVELS_FAIL = "GET_ALL_LEVELS_FAIL";
export const GET_ALL_USER_LEVELS_SUCCESS = "GET_ALL_USER_LEVELS_SUCCESS";
export const GET_ALL_USER_LEVELS_FAILURE = "GET_ALL_USER_LEVELS_FAILURE";
export const ADD_LEVELS_SUCCESS = "ADD_LEVELS_SUCCESS";
export const ADD_LEVELS_FAILURE = "ADD_LEVELS_FAILURE";

export const getAllLevels = () => async (dispatch) => {
  // res.data contains [{id: 1, name: "ABCDE"}, {...},] from levels table on back end
  // res.data will contain something like this in the future:
  // [{id: 6, name: "123456789"}, {...},] the same for words, phrases so on...
  await axiosWithAuth()
    .get("http://localhost:5000/levels/")
    .then((res) => {
      dispatch({ type: GET_ALL_LEVELS_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch({
        type: GET_ALL_LEVELS_FAIL,
        payload: "Failed to Retrieve Sign Lingo Levels!!",
      });
    });
};

export const getAllUserLevelsByID = () => async (dispatch) => {
  // res.data = contains
  // [{id: 1,
  //   user_level:1,
  //   level_id: 1,
  //   completed_flashcards: nullORtimestamp,
  //   completed_exercise: nullORtimestamp,
  //   completed_quiz: nullORtimestamp}, {...}]
  await axiosWithAuth()
    .get(`http://localhost:5000/levels/check/${localStorage.getItem("userID")}`)
    .then((res) => {
      dispatch({ type: GET_ALL_USER_LEVELS_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch({
        type: GET_ALL_USER_LEVELS_FAILURE,
        payload: "Failed to get all user_levels data",
      });
    });
};

export const addLevelsToUserAccount = (levels, userLevels) => async (dispatch) => {
  let levelsToAdd = []; // ends up containing all level_ids to add to user account
  if (userLevels.length === 0) {
    levels.forEach((level) => {
      levelsToAdd.push(level.id);
    });
  } else {
    let levelsToAddObjs = levels.filter((level) => {
      for (let i = 0; i < userLevels.length; i++) {
        if (userLevels[i].level_id === level.id) {
          return false;
        }
      }
      return true;
    });
    levelsToAddObjs.forEach((level) => {
      levelsToAdd.push(level.id);
    });
  }
  console.log("levels array", levelsToAdd);
  await axiosWithAuth()
    .post(
      `http://localhost:5000/levels/${localStorage.getItem("userID")}`,
      {levels: levelsToAdd}
    )
    .then((res) => {
      dispatch({ type: ADD_LEVELS_SUCCESS, payload: res.data });
      console.log("ADD USERS", res.data);
    })
    .catch((error) => {
      dispatch({
        type: ADD_LEVELS_FAILURE,
        payload: "Failed to add levels to user account",
      });
    });
};
