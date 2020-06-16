import { axiosWithAuth } from "../utils/axiosWithAuth";
export const GET_ALL_LEVELS_SUCCESS = "GET_ALL_LEVELS_SUCCESS";
export const GET_ALL_LEVELS_FAIL = "GET_ALL_LEVELS_FAIL";
export const GET_ALL_USER_LEVELS_SUCCESS = "GET_ALL_USER_LEVELS_SUCCESS";
export const GET_ALL_USER_LEVELS_FAILURE = "GET_ALL_USER_LEVELS_FAILURE";
export const ADD_LEVELS_SUCCESS = "ADD_LEVELS_SUCCESS";
export const ADD_LEVELS_FAILURE = "ADD_LEVELS_FAILURE";
export const GET_FLASHCARDS_SUCCESS = "GET_FLASHCARDS_SUCCESS";
export const GET_FLASHCARDS_FAILURE = "GET_FLASHCARDS_FAILURE";
export const GET_EXERCISES_SUCCESS = "GET_EXERCISES_SUCCESS";
export const GET_EXERCISES_FAILURE = "GET_EXERCISES_FAILURE";
const URL = process.env.REACT_APP_BACK_END_BASE_URL;

export const getAllLevels = () => async (dispatch) => {
  // res.data contains [{id: 1, name: "ABCDE"}, {...},] from levels table on back end
  // res.data will also contain something like this in the future:
  // [{id: 6, name: "123456789"}, {...},] for number levels,
  //  the same for words, phrases so on...
  const result = await axiosWithAuth()
    .get(URL + "levels/")
    .then((res) => {
      dispatch({ type: GET_ALL_LEVELS_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch({
        type: GET_ALL_LEVELS_FAIL,
        payload: "Failed to Retrieve Sign Lingo Levels!!",
      });
    });
    return result;
};

export const getAllUserLevelsByOktaUID = (oktaUID) => async (dispatch) => {
  // res.data contains the following in each entry:
  // [{id: 1,
  //   user_level:1,
  //   level_id: 1,
  //   completed_flashcards: nullORtimestamp,
  //   completed_exercise: nullORtimestamp,
  //   completed_quiz: nullORtimestamp}, {...}] will be updated with 
  // completed_numbers: nullORtimestamp, and for phrases, words, etc later
  const result = await axiosWithAuth()
    .get(`${URL}levels/${oktaUID}`)
    .then((res) => {
      dispatch({ type: GET_ALL_USER_LEVELS_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch({
        type: GET_ALL_USER_LEVELS_FAILURE,
        payload: "Failed to get all user_levels data",
      });
    });
    return result;
};

export const addLevelsToUserAccount = (levels, userLevels, oktaUID) => async (dispatch) => {
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
  await axiosWithAuth()
    .post(
      `${URL}levels/${oktaUID}`,
      {levels: levelsToAdd}
    )
    .then((res) => {
      dispatch({ type: ADD_LEVELS_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch({
        type: ADD_LEVELS_FAILURE,
        payload: "Failed to add levels to user account",
      });
    });
};


