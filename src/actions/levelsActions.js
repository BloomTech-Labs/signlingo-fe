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
    .then(res => {
        // dispatch({ type: GET_ALL_LEVELS_SUCCESS, payload: res.data });
        console.log("levels", res.data)
    })
    .catch(error => {
        dispatch({ type: GET_ALL_LEVELS_FAIL, payload: "Failed to Retrieve Sign Lingo Levels!! :(" });
    })
}