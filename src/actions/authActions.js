import axios from "axios";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

// Auth 2.0 combined with OpenID Connect still need to be implemented in this component
// this component is currenlty registering and logging in to a temporary server
// on port 5000 based on back end repo branch <feature/okta>

export const register = (credentials, history) => (dispatch) => {
  dispatch({
    type: LOGIN_START,
    payload: "Loading Your Dashboard...",
  });
  axios
    .post("http://localhost:5000/user/register", credentials)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userID", res.data.id)
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
      localStorage.setItem("userID", res.data.id)
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      history.push("/dashboard");
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAIL, payload: err });
      console.log("login error ran", err);
    });
};
