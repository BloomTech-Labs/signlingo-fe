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
      // res.data === [{id:1, name: "ABCDE"}, {...},] with name being level alphabet contents
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
    payload: "Retrieving Your Dashboard Info...",
  });
  axiosWithAuth()
    .get("http://localhost:5000/levels/check")
    .then((res) => {
    //   dispatch({ type: CHECK_USER_LEVELS_SUCCESS, payload: res.data });
    console.log("check levels res.data", res.data)
    })
    .catch((error) => {
      dispatch({
        type: CHECK_USER_LEVELS_FAILURE,
        payload: "Failed to check user status in relation to levels",
      });
    });
};
