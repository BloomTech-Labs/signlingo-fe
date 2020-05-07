import axios from "axios";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const login = obj => dispatch => {
  dispatch({ type: LOGIN_START });
  console.log("login info being sent", obj);

  axios
    .post("https://signlingobe-stag.herokuapp.com/api/auth/login", obj)
    .then(res => {
      console.log("res", res);

      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: LOGIN_ERROR, payload: err.error });
    });
};
