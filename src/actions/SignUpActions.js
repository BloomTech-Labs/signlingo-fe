import axios from "axios";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const register = (credentials, history) => (dispatch) => {
  dispatch({
    type: LOGIN_START,
    payload: "Loading Your Dashboard...",
  });
  axios
    .post("http://localhost:5000/user/register", credentials)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      history.push("/dashboard");
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAIL, payload: err });
    });
};

export const login = (credentials, history) => (dispatch) => {
  dispatch({
    type: LOGIN_START,
    payload: "Loading Your Dashboard...",
  });
  axios
    .post("http://localhost:5000/user/login", credentials)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      history.push("/dashboard");
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAIL, payload: err });
      console.log("login error ran", err);
    });
};
