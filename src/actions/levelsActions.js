import { axiosWithAuth } from "../utils/axiosWithAuth";

export const GET_LEVELS_START = "GET_LEVELS_START";
export const GET_LEVELS_SUCCESS = "GET_LEVELS_SUCCESS";
export const GET_LEVELS_FAIL = "GET_LEVELS_FAIL";
export const ADD_LEVEL_START = "ADD_LEVEL_START";
export const ADD_LEVEL_SUCCESS = "ADD_LEVEL_SUCCESS";
export const ADD_LEVEL_FAIL = "ADD_LEVEL_FAIL";

export const getAllLevels = () => (dispatch) => {
    dispatch({ type: GET_LEVELS_START, payload: "getting levels"})
    axiosWithAuth().get("http://localhost:5000/levels/")
    .then(res => {
        dispatch({ type: GET_LEVELS_SUCCESS, payload: res.data })
    })
    .catch(error => {
        dispatch({ type: GET_LEVELS_FAIL, payload: "failed adding level"})
    })
}

export const addLevels = () => (dispatch) => {
    dispatch({ type: ADD_LEVEL_START, payload: "adding level"})
    axiosWithAuth().post("http://localhost:5000/levels/", levelBody)
    .then(res => {
        dispatch({ type: ADD_LEVEL_SUCCESS, payload: res.data })
    })
    .catch(error => {
        dispatch({ type: ADD_LEVEL_FAIL, payload: "failed adding level"})
    })
}

